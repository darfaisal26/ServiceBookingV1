import { Request, Response } from 'express';
import {
  getAllServices as fetchAllServices,
  getServiceById as fetchServiceById,
  createService as createServiceRepo,
  updateService as updateServiceRepo,
  deleteService as deleteServiceRepo,
  toggleServiceStatus as toggleServiceStatusRepo,
} from "../../repositories/service.repository";

export const getAllServices = async (req: Request, res: Response) => {
  const services = await fetchAllServices();
  res.json(services);
};

export const getServiceById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const service = await fetchServiceById(id);
  if (!service) {
    res.status(404).json({ message: "Service not found" });
    return;
  }
  res.json(service);
};

export const createService = async (req: Request, res: Response) => {
  const { service_name } = req.body;
  const newService = await createServiceRepo(service_name);
  res.status(201).json(newService);
};

export const updateService = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { service_name, is_active } = req.body;
  try {
    const updated = await updateServiceRepo(id, service_name, is_active);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: "Service not found" });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await deleteServiceRepo(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: "Service not found" });
  }
};

export const toggleServiceStatus = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { is_active } = req.body;

  if (typeof is_active !== "boolean") {
    res.status(400).json({ message: "is_active must be a boolean" });
    return;
  }

  try {
    const updated = await toggleServiceStatusRepo(id, is_active);
    res.json({
      message: `Service ${is_active ? "activated" : "deactivated"}`,
      service: updated,
    });
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
};
