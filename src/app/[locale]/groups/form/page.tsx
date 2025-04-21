'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, FormProvider } from "react-hook-form";
import { useTranslations } from 'next-intl';
import { FormInput } from '@/app/[locale]/components/FormInput';
import { FormSelect } from '@/app/[locale]/components/FormSelect';
import { FormRadioGroup } from '@/app/[locale]/components/FormRadioGroup';
import { FormCheckbox } from '@/app/[locale]/components/FormCheckbox';
import { FormDate } from '@/app/[locale]/components/FormDate';
import { RoomSelection } from '@/app/[locale]/components/RoomSelection';
import { LanguageSelector } from '@/app/[locale]/components/LanguageSelector';

interface ContactDetails {
  title: string;
  firstName: string;
  lastName: string;
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  location: string;
}

interface RoomRequirements {
  totalRooms: number;
  hasChildren: boolean;
  notes: string;
}

type FieldName = "title" | "firstName" | "lastName" | "mobile" | "email" | "bookingType" | "stayType" | "hasYouth" | "reason" | "hotelName" | "companyName" | "checkIn" | "checkOut" | "packageType" | "totalRooms" | "hasChildren" | "hasAccessibleRoom" | "notes";

type bookingType = "business" | "personal" | "agent" | "operator";

export default function GroupBookingForm() {
  const t = useTranslations();
  const [openSection, setOpenSection] = useState<string>('contact');
  const sectionOrder = ['contact', 'booking', 'rooms'];

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      mobile:'',
      email:'',
      bookingType: '',
      stayType:'',
      hasYouth: false,
      companyName: '',
      reason: '',
      hotelName: '',
      checkIn: '',
      checkOut: '',
      packageType: 'breakfast',
      singleRooms: 0,
      doubleRooms: 0,
      twinRooms: 0,
      totalRooms: 0,
      hasChildren: false,
      hasAccessibleRoom: false,
      notes: ''
    }
  });
  const { register, handleSubmit, trigger, watch, formState: { errors } } = methods;

  const bookingType = watch('bookingType');

  const handleContinue = async (section: string) => {
    let fields: FieldName[] = [];
    if (section === 'contact') fields = ['title', 'firstName', 'lastName', 'mobile', 'email'];
    if (section === 'booking') fields = ['bookingType', 'stayType', 'hasYouth', 'reason', 'hotelName', 'companyName', 'checkIn', 'checkOut', 'packageType'];
    if (section === 'rooms') fields = ['totalRooms'];
    const valid = await trigger(fields);
    if (valid) {
      const idx = sectionOrder.indexOf(section);
      if (idx < sectionOrder.length - 1) setOpenSection(sectionOrder[idx + 1]);
    }
  };

  const onSubmit = (data: any) => {
    // handle final submission
    console.log('Form data:', data);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Image 
            src="https://www.premierinn.com/content/dam/pi/websites/desktop/icons/brand/pi-logo-rest-easy.svg" 
            alt="Premier Inn" 
            width={120} 
            height={40}
            priority
          />
          <LanguageSelector />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 w-[500px]">
        <h1 className="text-3xl font-bold text-[#4F2D7F] mb-4">{t('header.title')}</h1>
        <p className="text-gray-600 mb-8">{t('header.description')}</p>

        <FormProvider {...methods}>
        <form className="max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'contact' ? '' : 'contact')}>
              <span className="text-lg font-semibold text-gray-500">{t('sections.contact.title')}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'contact' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'contact' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4">{t('sections.contact.subtitle')}</h3>
                <div className="space-y-2">
                  <FormSelect
                    label={t('sections.contact.fields.title')}
                    name="title"
                    required
                    options={[
                      { value: "mr", label: "Mr" },
                      { value: "mrs", label: "Mrs" },
                      { value: "miss", label: "Miss" },
                      { value: "ms", label: "Ms" },
                      { value: "dr", label: "Dr" },
                    ]}
                    register={register}
                    error={errors.title}
                  />

                  <FormInput
                    label={t('sections.contact.fields.firstName')}
                    name="firstName"
                    required
                    register={register}
                    error={errors.firstName}
                  />
                  <FormInput
                    label={t('sections.contact.fields.lastName')}
                    name="lastName"
                    required
                    register={register}
                    error={errors.lastName}
                  />
                  <FormInput
                    label={t('sections.contact.fields.mobile')}
                    name="mobile"
                    required
                    register={register}
                    error={errors.mobile}
                  />
                  <FormInput
                    label={t('sections.contact.fields.email')}
                    name="email"
                    required
                    register={register}
                    error={errors.email}
                  />
                </div>
                <div className="flex mt-4">
                  <button type="button" className="w-full bg-[#00798e] text-white py-3 rounded" onClick={() => handleContinue('contact')}>{t('buttons.continue')}</button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'booking' ? '' : 'booking')}>
              <span className="text-lg font-semibold text-gray-500">{t('sections.booking.title')}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'booking' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'booking' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-4">
                {/* <h3 className="text-lg font-semibold mb-4">Your booking details</h3> */}
                <div className="space-y-4">
                  <FormRadioGroup
                    label={t('sections.booking.fields.bookerType.label')}
                    name="bookingType"
                    required
                    options={[
                      { value: "personal", label: `${t('sections.booking.fields.bookerType.options.personal')}` },
                      { value: "business", label: `${t('sections.booking.fields.bookerType.options.business')}` },
                      { value: "agent", label: `${t('sections.booking.fields.bookerType.options.agent')}` },
                      { value: "operator", label: `${t('sections.booking.fields.bookerType.options.operator')}` },
                    ]}
                    register={register}
                    error={errors.bookingType}
                  />
                  {bookingType && bookingType !=='personal' && (
                    <div className='mt-5'>
                      <input type="text" {...register('companyName')} placeholder={t('sections.booking.fields.companyName')} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                    </div>
                  )}

                  <div className='!mt-10'>
                    <FormRadioGroup
                      label={t('sections.booking.fields.stayType.label')}
                      name="stayType"
                      required
                      options={[
                        { value: "business", label: `${t('sections.booking.fields.stayType.options.business')}` },
                        { value: "leisure", label: `${t('sections.booking.fields.stayType.options.leisure')}` },
                      ]}
                      register={register}
                      error={errors.stayType}
                    />
                  </div>
                  
                  <FormCheckbox
                    label={t('sections.booking.fields.youthGroup')}
                    name="hasYouth"
                    register={register}
                  />

                  <div className='!mt-10'>
                    <FormSelect
                      label={t('sections.booking.fields.visitReason')}
                      name="reason"
                      required
                      options={[
                        { value: "mr", label: "Mr" },
                        { value: "mrs", label: "Mrs" },
                        { value: "miss", label: "Miss" },
                        { value: "ms", label: "Ms" },
                        { value: "dr", label: "Dr" },
                      ]}
                      register={register}
                      error={errors.reason}
                    />
                  </div>

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">{t('sections.booking.fields.bookingDetails.title')} </label>
                    <p className="text-sm leading-5 text-gray-500 mb-2">{t('sections.booking.fields.bookingDetails.description')}</p>
                    <FormInput
                      label=""
                      placeholder={t('sections.booking.fields.bookingDetails.hotelName')}
                      name="hotelName"
                      register={register}
                      error={errors.hotelName}
                    />
                    <FormDate
                      label={t('sections.booking.fields.bookingDetails.checkIn')}
                      name="checkIn"
                      className='mt-4'
                      required
                      register={register}
                      error={errors.checkIn}
                      minDate={new Date().toISOString().split('T')[0]} // Sets minimum date to today
                    />
                    <FormDate
                      label={t('sections.booking.fields.bookingDetails.checkOut')}
                      name="checkOut"
                      className='mt-4'
                      required
                      register={register}
                      error={errors.checkOut}
                      minDate={watch('checkIn')} // Makes check-out date dependent on check-in date
                    />
                  </div>
                  

                  <div className='!mt-10'>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">{t('sections.booking.fields.packageType.title')}</label>
                    <p className="text-sm leading-5 text-gray-500 mb-4">{t('sections.booking.fields.packageType.description')}</p>
                    <FormRadioGroup
                      label=""
                      name="packageType"
                      options={[
                        { value: "breakfast", label: `${t('sections.booking.fields.packageType.options.breakfast')}` },
                        { value: "mealdeal", label: `${t('sections.booking.fields.packageType.options.mealdeal')}` },
                      ]}
                      register={register}
                      error={errors.packageType}
                    />
                  </div>

                </div>
                <div className="flex mt-4">
                  <button type="button" className="w-full bg-[#00798e] text-white px-6 py-3 rounded" onClick={() => handleContinue('booking')}>{t('buttons.continue')}</button>
                </div>
              </div>
            </div>
          </div>


          {/* Room Requirements Section */}
          <div className="border overflow-hidden mb-0">
            <button type="button" className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors" onClick={() => setOpenSection(openSection === 'rooms' ? '' : 'rooms')}>
              <span className="text-lg font-semibold text-gray-500">{t('sections.rooms.title')}</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openSection === 'rooms' ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ${openSection === 'rooms' ? 'max-h-[auto] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-1">{t('sections.rooms.fields.rooms.title')}</label>
                    <p className="text-sm leading-5 text-gray-500">{t('sections.rooms.fields.rooms.description')}</p>
                    <p className='my-2 underline'>{t('sections.rooms.fields.rooms.seeTypes')}</p>
                  </div>
                  
                  <FormCheckbox
                    label={t('sections.rooms.fields.withChildren')}
                    name="hasChildren"
                    register={register}
                  />

                  <FormCheckbox
                    label={t('sections.rooms.fields.accessibleRoom')}
                    name="hasAccessibleRoom"
                    register={register}
                  />

                  <RoomSelection
                    register={register}
                    setValue={methods.setValue}
                    watch={watch}
                  />

                  <div className='!mt-10'>
                    <label className="block text-lg font-medium text-gray-700 mb-1">{t('sections.rooms.fields.additionalInfo.title')}</label>
                    <p className="text-sm leading-5 text-gray-500">{t('sections.rooms.fields.additionalInfo.description')}</p>
                    <p className="text-sm mt-4 leading-5 text-gray-500">{t('sections.rooms.fields.additionalInfo.nightlyRequirements')}</p>
                    <textarea {...register('notes')} rows={4} placeholder={t('sections.rooms.fields.additionalInfo.placeholder')} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none mt-4 focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="w-full bg-[#00798e] text-white px-6 py-3 rounded">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        </FormProvider>
      </main>
    </div>
  );
}