'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateCompany(id: string, formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/company/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update company');
    }

    revalidatePath('/company');
    redirect('/company');
  } catch (error) {
    console.error('Error updating company:', error);
    throw new Error('Failed to update company');
  }
}

export async function deleteCompany(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/company/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete company');
    }

    revalidatePath('/company');
    return { success: true };
  } catch (error) {
    console.error('Error deleting company:', error);
    throw new Error('Failed to delete company');
  }
}