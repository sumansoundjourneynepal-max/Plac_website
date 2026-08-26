import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productAPI = {
  getAll: () => axiosInstance.get('/products'),
  getById: (id: string) => axiosInstance.get(`/products/${id}`),
  getForShop: () => axiosInstance.get('/products/shop'),
  create: (data: any) => {
    const isFormData = data instanceof FormData;
    return axiosInstance.post('/products', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  update: (id: string, data: any) => {
    const isFormData = data instanceof FormData;
    return axiosInstance.put(`/products/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  delete: (id: string) => axiosInstance.delete(`/products/${id}`),
};

// Classes API (legacy, kept for backward compat - superseded by packageAPI)
export const classAPI = {
  getAll: () => axiosInstance.get('/classes'),
  getById: (id: string) => axiosInstance.get(`/classes/${id}`),
  create: (data: any) => axiosInstance.post('/classes', data),
  update: (id: string, data: any) => axiosInstance.put(`/classes/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/classes/${id}`),
};

// Packages API (sessions, courses, journeys - physical & virtual)
export const packageAPI = {
  getAll: (category?: string) =>
    axiosInstance.get('/packages', { params: category ? { category } : {} }),
  getAllAdmin: () => axiosInstance.get('/packages/admin/all'),
  getById: (id: string) => axiosInstance.get(`/packages/${id}`),
  create: (data: any) => {
    const isFormData = data instanceof FormData;
    return axiosInstance.post('/packages', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  update: (id: string, data: any) => {
    const isFormData = data instanceof FormData;
    return axiosInstance.put(`/packages/${id}`, data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
  },
  delete: (id: string) => axiosInstance.delete(`/packages/${id}`),
};

// Bookings / Inquiries API
export const bookingAPI = {
  create: (data: {
    packageId: string;
    name: string;
    email: string;
    phone: string;
    mode: 'physical' | 'virtual';
    address?: string;
    preferredWindow?: string;
    message?: string;
  }) => axiosInstance.post('/bookings', data),
  getAll: (status?: string) =>
    axiosInstance.get('/bookings', { params: status ? { status } : {} }),
  updateStatus: (id: string, status: string) =>
    axiosInstance.patch(`/bookings/${id}/status`, { status }),
  delete: (id: string) => axiosInstance.delete(`/bookings/${id}`),
};

export default axiosInstance;
