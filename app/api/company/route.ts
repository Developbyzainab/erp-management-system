import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// Helper function to ensure table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS erp_company (
      id BIGINT PRIMARY KEY,
      ten_id BIGINT,
      company_name VARCHAR(300) NOT NULL,
      tel_phone VARCHAR(20),
      mobile VARCHAR(20),
      email VARCHAR(300),
      website VARCHAR(300),
      address VARCHAR(3000),
      tax_no VARCHAR(100),
      contact_person VARCHAR(300),
      logo_path VARCHAR(200),
      org_id BIGINT,
      created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by BIGINT,
      last_updated_date TIMESTAMP,
      last_updated_by BIGINT
    )
  `);
}

export async function POST(request: NextRequest) {
  try {
    await ensureTable();
    const formData = await request.formData();
    
    const id = Date.now();
    const company_name = formData.get('company_name') as string;
    const tax_no = formData.get('tax_no') as string;
    const contact_person = formData.get('contact_person') as string;
    const tel_phone = formData.get('tel_phone') as string;
    const mobile = formData.get('mobile') as string;
    const email = formData.get('email') as string;
    const website = formData.get('website') as string;
    const address = formData.get('address') as string;
    const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
    const org_id = formData.get('org_id') ? parseInt(formData.get('org_id') as string) : null;
    const logo_path = formData.get('logo_path') as string;
    const created_by = formData.get('created_by') ? parseInt(formData.get('created_by') as string) : null;

    await pool.query(
      `INSERT INTO erp_company (
        id, ten_id, company_name, tel_phone, mobile, email, website,
        address, tax_no, contact_person, logo_path, org_id, created_by, created_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)`,
      [id, ten_id, company_name, tel_phone, mobile, email, website,
       address, tax_no, contact_person, logo_path, org_id, created_by]
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const result = await pool.query('SELECT * FROM erp_company WHERE id = $1', [id]);
      return NextResponse.json(result.rows[0] || null);
    } else {
      const result = await pool.query('SELECT * FROM erp_company ORDER BY created_date DESC');
      return NextResponse.json(result.rows);
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json([]);
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureTable();
    const formData = await request.formData();
    const id = formData.get('id') as string;
    
    const ten_id = formData.get('ten_id') ? parseInt(formData.get('ten_id') as string) : null;
    const company_name = formData.get('company_name') as string;
    const tel_phone = formData.get('tel_phone') as string;
    const mobile = formData.get('mobile') as string;
    const email = formData.get('email') as string;
    const website = formData.get('website') as string;
    const address = formData.get('address') as string;
    const tax_no = formData.get('tax_no') as string;
    const contact_person = formData.get('contact_person') as string;
    const logo_path = formData.get('logo_path') as string;
    const org_id = formData.get('org_id') ? parseInt(formData.get('org_id') as string) : null;
    const last_updated_by = formData.get('last_updated_by') ? parseInt(formData.get('last_updated_by') as string) : null;

    await pool.query(
      `UPDATE erp_company SET
        ten_id = $1, company_name = $2, tel_phone = $3, mobile = $4,
        email = $5, website = $6, address = $7, tax_no = $8,
        contact_person = $9, logo_path = $10, org_id = $11,
        last_updated_by = $12, last_updated_date = CURRENT_TIMESTAMP
       WHERE id = $13`,
      [ten_id, company_name, tel_phone, mobile, email, website,
       address, tax_no, contact_person, logo_path, org_id, last_updated_by, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await pool.query('DELETE FROM erp_company WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
  }
}