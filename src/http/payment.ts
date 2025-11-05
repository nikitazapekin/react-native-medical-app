import type { PaymentHistory, PaymentHistoryRequest } from './types/payment';
import $api from './api';

class PaymentService {
 
  static async getAllPayments(): Promise<PaymentHistory[]> {
    try {
      const response = await $api.get<PaymentHistory[]>('/payments');
      return response.data;
    } catch (error) {
      console.error('Error getting all payments:', error);
      throw new Error('Failed to get payments list');
    }
  }
 
  static async getPaymentById(id: number): Promise<PaymentHistory> {
    try {
      const response = await $api.get<PaymentHistory>(`/payments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting payment with id ${id}:`, error);
      throw new Error('Failed to get payment information');
    }
  }
 
  static async getPaymentsByPatientId(patientId: number): Promise<PaymentHistory[]> {
    try {
      const response = await $api.get<PaymentHistory[]>(`/payments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting payments for patient ${patientId}:`, error);
      throw new Error('Failed to get patient payments');
    }
  }
 
  static async createPayment(paymentData: PaymentHistoryRequest): Promise<PaymentHistory> {
    try {
      console.log('Creating payment with data:', paymentData);
      const response = await $api.post<PaymentHistory>('/payments', paymentData);
      
      console.log('Payment creation successful');
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new Error('Failed to create payment');
    }
  }
 
  static async updatePayment(id: number, paymentData: Partial<PaymentHistoryRequest>): Promise<PaymentHistory> {
    try {
      console.log(`Updating payment ${id} with data:`, paymentData);
      const response = await $api.put<PaymentHistory>(`/payments/${id}`, paymentData);
      
      console.log('Payment update successful');
      return response.data;
    } catch (error) {
      console.error(`Error updating payment ${id}:`, error);
      throw new Error('Failed to update payment');
    }
  }
 
  static async deletePayment(id: number): Promise<void> {
    try {
      console.log(`Deleting payment with id: ${id}`);
      await $api.delete(`/payments/${id}`);
      
      console.log('Payment deletion successful');
    } catch (error) {
      console.error(`Error deleting payment ${id}:`, error);
      throw new Error('Failed to delete payment');
    }
  }

   
}

export default PaymentService;
