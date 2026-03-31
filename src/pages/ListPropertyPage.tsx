import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const islands = ['Roatán', 'Útila', 'Guanaja'];
const locations = ['West Bay', 'West End', 'Sandy Bay', 'French Harbour', 'Pristine Bay', 'Coxen Hole', 'Oak Ridge', 'Other'];

type FormData = {
  category: 'residential' | 'commercial' | '';
  residentialType: 'condo' | 'home' | 'other' | '';
  commercialType: string;
  monthlyRent: string;
  hoa: string;
  maintenance: string;
  sqft: string;
  lotSize: string;
  location: string;
  island: string;
  roadFront: boolean | null;
  waterfront: boolean | null;
  ownerName: string;
  phone: string;
  email: string;
};

const defaultForm: FormData = {
  category: '',
  residentialType: '',
  commercialType: '',
  monthlyRent: '',
  hoa: '',
  maintenance: '',
  sqft: '',
  lotSize: '',
  location: '',
  island: 'Roatán',
  roadFront: null,
  waterfront: null,
  ownerName: '',
  phone: '',
  email: '',
};

const inputClass =
  'w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] transition-all';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

const YesNoToggle = ({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex gap-3">
    {[true, false].map((v) => (
      <button
        key={String(v)}
        type="button"
        onClick={() => onChange(v)}
        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
          value === v
            ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white'
            : 'bg-white border-gray-200 text-gray-600 hover:border-[#0ea5e9]/40'
        }`}
      >
        {v ? 'Yes' : 'No'}
      </button>
    ))}
  </div>
);

const ListPropertyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.category) e.category = 'Please select a property type';
    if (form.category === 'residential' && !form.residentialType)
      e.residentialType = 'Please select a subtype';
    if (form.category === 'commercial' && !form.commercialType.trim())
      e.commercialType = 'Please describe the commercial type';
    if (!form.monthlyRent) e.monthlyRent = 'Required';
    if (!form.sqft) e.sqft = 'Required';
    if (!form.location) e.location = 'Required';
    if (!form.island) e.island = 'Required';
    if (form.roadFront === null) e.roadFront = 'Required';
    if (form.waterfront === null) e.waterfront = 'Required';
    if (!form.ownerName.trim()) e.ownerName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      const first = document.querySelector('[data-error]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Listing submitted!</h2>
          <p className="text-gray-500 mb-8">
            Thanks, <span className="font-medium text-gray-700">{form.ownerName}</span>. We'll
            review your property and get back to you at{' '}
            <span className="font-medium text-gray-700">{form.email}</span> within one business day.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary w-full"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-wide h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0ea5e9] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-semibold text-gray-900">roatan.rent</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide py-12 max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List your property</h1>
          <p className="text-gray-500">Fill in the details below and we'll get your listing live.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          {/* Property Type */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Property type</h2>

            {/* Residential / Commercial */}
            <div className="mb-5">
              <label className={labelClass}>Category <span className="text-red-400">*</span></label>
              <div className="flex gap-3" data-error={errors.category ? true : undefined}>
                {(['residential', 'commercial'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      set('category', cat);
                      set('residentialType', '');
                      set('commercialType', '');
                    }}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                      form.category === cat
                        ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#0ea5e9]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && <p className="text-red-500 text-xs mt-1.5">{errors.category}</p>}
            </div>

            {/* Residential subtype */}
            {form.category === 'residential' && (
              <div data-error={errors.residentialType ? true : undefined}>
                <label className={labelClass}>Subtype <span className="text-red-400">*</span></label>
                <div className="flex gap-3">
                  {(['condo', 'home', 'other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set('residentialType', t)}
                      className={`flex-1 py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                        form.residentialType === t
                          ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#0ea5e9]/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.residentialType && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.residentialType}</p>
                )}
              </div>
            )}

            {/* Commercial type */}
            {form.category === 'commercial' && (
              <div data-error={errors.commercialType ? true : undefined}>
                <label className={labelClass}>
                  Describe the commercial type <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Retail space, Office, Restaurant, Warehouse…"
                  value={form.commercialType}
                  onChange={(e) => set('commercialType', e.target.value)}
                  className={inputClass}
                />
                {errors.commercialType && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.commercialType}</p>
                )}
              </div>
            )}
          </section>

          {/* Financials */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Financials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div data-error={errors.monthlyRent ? true : undefined}>
                <label className={labelClass}>Monthly rent (USD) <span className="text-red-400">*</span></label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.monthlyRent}
                  onChange={(e) => set('monthlyRent', e.target.value)}
                  className={inputClass}
                />
                {errors.monthlyRent && <p className="text-red-500 text-xs mt-1.5">{errors.monthlyRent}</p>}
              </div>
              <div>
                <label className={labelClass}>HOA (USD/mo)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.hoa}
                  onChange={(e) => set('hoa', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Maintenance (USD/mo)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.maintenance}
                  onChange={(e) => set('maintenance', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Property details */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Property details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={errors.sqft ? true : undefined}>
                  <label className={labelClass}>Size (sqft) <span className="text-red-400">*</span></label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.sqft}
                    onChange={(e) => set('sqft', e.target.value)}
                    className={inputClass}
                  />
                  {errors.sqft && <p className="text-red-500 text-xs mt-1.5">{errors.sqft}</p>}
                </div>
                <div>
                  <label className={labelClass}>Lot size (sqft)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.lotSize}
                    onChange={(e) => set('lotSize', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={errors.location ? true : undefined}>
                  <label className={labelClass}>Location <span className="text-red-400">*</span></label>
                  <select
                    value={form.location}
                    onChange={(e) => set('location', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select area…</option>
                    {locations.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-500 text-xs mt-1.5">{errors.location}</p>}
                </div>
                <div data-error={errors.island ? true : undefined}>
                  <label className={labelClass}>Island <span className="text-red-400">*</span></label>
                  <select
                    value={form.island}
                    onChange={(e) => set('island', e.target.value)}
                    className={inputClass}
                  >
                    {islands.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                  {errors.island && <p className="text-red-500 text-xs mt-1.5">{errors.island}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={errors.roadFront ? true : undefined}>
                  <label className={labelClass}>Road front <span className="text-red-400">*</span></label>
                  <YesNoToggle value={form.roadFront} onChange={(v) => set('roadFront', v)} />
                  {errors.roadFront && <p className="text-red-500 text-xs mt-1.5">{errors.roadFront}</p>}
                </div>
                <div data-error={errors.waterfront ? true : undefined}>
                  <label className={labelClass}>Waterfront <span className="text-red-400">*</span></label>
                  <YesNoToggle value={form.waterfront} onChange={(v) => set('waterfront', v)} />
                  {errors.waterfront && <p className="text-red-500 text-xs mt-1.5">{errors.waterfront}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Owner info */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Owner information</h2>
            <div className="space-y-4">
              <div data-error={errors.ownerName ? true : undefined}>
                <label className={labelClass}>Full name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.ownerName}
                  onChange={(e) => set('ownerName', e.target.value)}
                  className={inputClass}
                />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1.5">{errors.ownerName}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={errors.phone ? true : undefined}>
                  <label className={labelClass}>Phone <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    placeholder="+504 0000 0000"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className={inputClass}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                </div>
                <div data-error={errors.email ? true : undefined}>
                  <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={inputClass}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </div>
              </div>
            </div>
          </section>

          <button type="submit" className="btn-primary w-full py-4 text-base">
            Submit listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListPropertyPage;
