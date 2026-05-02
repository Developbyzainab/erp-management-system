import { ArrowLeft, Save, Building, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';

export default function TenantForm({ 
  initialData = {}, 
  action, 
  title = "Tenants Registration",
  isView = false 
}: { 
  initialData?: any, 
  action?: any,
  title?: string,
  isView?: boolean 
}) {
  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/tenants" className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Top Decorative Border */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <form action={action} className="p-6 md:p-8">
          
          {/* Section: General Info */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Building className="text-blue-500" size={20} />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">General Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input 
                label="Tenant Code"
                name="tenant_code"
                defaultValue={initialData?.tenant_code || ''}
                isView={isView}
                placeholder="Enter unique code"
              />
              <div className="lg:col-span-2">
                <Input 
                  label="Tenant Name"
                  name="tenant_name"
                  defaultValue={initialData?.tenant_name || ''}
                  required
                  isView={isView}
                  placeholder="Enter full organization name"
                />
              </div>
              <Input 
                label="Account No."
                name="acc_no"
                defaultValue={initialData?.acc_no || ''}
                isView={isView}
                placeholder="Bank account number"
              />
              <Input 
                label="Tax No / Social Security"
                name="tax_no"
                defaultValue={initialData?.tax_no || ''}
                isView={isView}
                placeholder="Tax ID or NTN"
              />
            </div>
          </div>

          {/* Section: Contact Details */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Phone className="text-indigo-500" size={20} />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input 
                label="Contact Person"
                name="contact_person"
                defaultValue={initialData?.contact_person || ''}
                isView={isView}
                placeholder="Primary contact name"
              />
              <Input 
                label="Tel Phone"
                name="tel_phone"
                defaultValue={initialData?.tel_phone || ''}
                isView={isView}
                placeholder="Landline number"
              />
              <Input 
                label="Mobile"
                name="mobile"
                defaultValue={initialData?.mobile || ''}
                isView={isView}
                placeholder="Mobile number"
              />
              <div className="lg:col-span-2">
                <Input 
                  label="Email Address"
                  type="email"
                  name="email"
                  defaultValue={initialData?.email || ''}
                  isView={isView}
                  placeholder="Official email address"
                />
              </div>
              <Input 
                label="Website"
                name="website"
                defaultValue={initialData?.website || ''}
                isView={isView}
                placeholder="https://www.example.com"
              />
            </div>
          </div>

          {/* Section: Location & Settings */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <MapPin className="text-purple-500" size={20} />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Location & Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="md:col-span-2 lg:col-span-3">
                <Input 
                  label="Full Address"
                  name="address"
                  defaultValue={initialData?.address || ''}
                  isView={isView}
                  placeholder="Street address, building, etc."
                />
              </div>
              <Select 
                label="Country"
                name="shr_cnt_code"
                defaultValue={initialData?.shr_cnt_code || ''}
                isView={isView}
                options={[
                  { label: 'Pakistan', value: 'PK' },
                  { label: 'United States', value: 'US' },
                  { label: 'United Kingdom', value: 'UK' },
                  { label: 'UAE', value: 'AE' }
                ]}
              />
              <Select 
                label="City"
                name="shr_cty_code"
                defaultValue={initialData?.shr_cty_code || ''}
                isView={isView}
                options={[
                  { label: 'Karachi', value: 'KHI' },
                  { label: 'Lahore', value: 'LHE' },
                  { label: 'Islamabad', value: 'ISB' },
                  { label: 'Dubai', value: 'DXB' }
                ]}
              />
              <Select 
                label="Default Currency"
                name="shr_cur_code"
                defaultValue={initialData?.shr_cur_code || ''}
                isView={isView}
                options={[
                  { label: 'PKR', value: 'PKR' },
                  { label: 'USD', value: 'USD' },
                  { label: 'EUR', value: 'EUR' },
                  { label: 'AED', value: 'AED' }
                ]}
              />
              
              <div className="lg:col-span-3 mt-4">
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">Account Security</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Lock this tenant to temporarily prevent access.</p>
                  </div>
                  <div className="-mt-8">
                    <Toggle 
                      label="Lock Account"
                      name="locked"
                      defaultChecked={initialData?.locked === 1}
                      isView={isView}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!isView && (
            <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-slate-800">
              <Link 
                href="/tenants" 
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold shadow-sm"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Save size={20} />
                Save Details
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
