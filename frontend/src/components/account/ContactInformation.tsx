import FormField from '@components/FormField'
import FormCard from '../FormCard'
import { ContactInfo } from '@type/User'

type PropTypes = {
  form: ContactInfo,
  handleData: (name: string, value: string | null) => void
}

const ContactInformation = ({form, handleData}: PropTypes) => {
  return (
    <FormCard id='contactInfo' title='Contact Information' mt="20px">
      <FormField value={form.email} handleChange={handleData}  fullWidth label="Email" name='email' />
      <FormField value={form.phone} handleChange={handleData} fullWidth label="Phone" name='phone' />
      <FormField value={form.address} handleChange={handleData} fullWidth label="Address" name='address' />
    </FormCard>
  )
}

export default ContactInformation
