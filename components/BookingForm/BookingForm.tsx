'use client';

import { useState, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';
import toast from 'react-hot-toast';

type BookingFormData = {
  name: string;
  email: string;
  startDate: string;
  comment?: string;
};

const BookingForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const values: BookingFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      startDate: startDate ? startDate.toISOString() : '',
      comment: (formData.get('comment') as string) || '',
    };

    if (!values.name || !values.email || !values.startDate) {
      toast.error('Please fill in all required fields!');
      return;
    }

    toast.success('Your booking request has been sent!');

    e.currentTarget.reset();
    setStartDate(null);
  };

  return (
    <div className={css.containerWrapper}>
      <div className={css.titleWrapper}>
        <h3 className={css.formTitle}>Book your campervan now</h3>
        <p className={css.formText}>Stay connected! We are always ready to help you.</p>
      </div>

      <form className={css.bookingForm} onSubmit={handleSubmit}>
        <label>
          <input type="text" className={css.formInput} placeholder="Name*" name="name" required />
        </label>

        <label>
          <input
            type="email"
            placeholder="Email*"
            className={css.formInput}
            name="email"
            required
          />
        </label>

        <label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date*"
            className={css.formInput}
            dateFormat="dd.MM.yyyy"
            required
          />
        </label>

        <textarea name="comment" className={css.formTextarea} placeholder="Comment" />

        <button type="submit" className={css.formBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
