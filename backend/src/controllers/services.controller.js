import { db } from '../config/firebaseAdmin.js';

// POST /services
const createService = async (req, res) => {
  try {
    const { name, duration, price, image, active } = req.body;
    const newServiceRef = db.collection('services').doc();
    
    const serviceData = {
      id: newServiceRef.id,
      name,
      duration: duration || "",
      price: Number(price) || 0,
      image: image || "",
      active: active !== undefined ? active : true,
      createdAt: new Date().toISOString()
    };

    await newServiceRef.set(serviceData);
    return res.status(201).json({ message: "Serviço criado com sucesso.", service: serviceData });
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return res.status(500).json({ message: "Erro ao criar serviço." });
  }
};

// GET /services
const getServices = async (req, res) => {
  try {
    const snapshot = await db.collection('services').get();
    const services = [];
    snapshot.forEach(doc => services.push(doc.data()));
    return res.status(200).json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return res.status(500).json({ message: "Erro ao buscar serviços." });
  }
};

// PUT /services/:id
const updateService = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await db.collection('services').doc(id).update(updates);
    return res.status(200).json({ message: "Serviço atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return res.status(500).json({ message: "Erro ao atualizar serviço." });
  }
};

// DELETE /services/:id
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('services').doc(id).delete();
    return res.status(200).json({ message: "Serviço deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    return res.status(500).json({ message: "Erro ao deletar serviço." });
  }
};

export {
  createService,
  getServices,
  updateService,
  deleteService
};