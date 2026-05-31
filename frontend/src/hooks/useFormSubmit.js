import { useState } from 'react';
import { generateInvitation } from '../services/invitationService';
import { validateForm, hasErrors } from '../utils/validators';
import toast from 'react-hot-toast';

const EMPTY = { name: '', email: '', interest: '' };
const NO_ERRORS = { name: null, email: null, interest: null };

export const useFormSubmit = () => {
  const [form, setForm]       = useState(EMPTY);
  const [errors, setErrors]   = useState(NO_ERRORS);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);

  const setField = (field) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  const setSuggestion = (text) => {
    setForm((p) => ({ ...p, interest: text }));
    setErrors((p) => ({ ...p, interest: null }));
  };

  const submit = async () => {
    const errs = validateForm(form);
    if (hasErrors(errs)) {
      setErrors(errs);
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setErrors(NO_ERRORS);
    setLoading(true);
    setResult(null);

    try {
      const data = await generateInvitation(form);
      setResult(data);
      toast.success('Your invitation has been generated!');
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors(NO_ERRORS);
    setResult(null);
  };

  return { form, errors, loading, result, setField, setSuggestion, submit, reset };
};
