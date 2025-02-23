import FormField from '@components/FormField'
import FormCard from '../FormCard'

const ContactInformation = () => {
  return (
    <FormCard id='contactInfo' title='Contact Information' mt="20px">
      <FormField fullWidth label="Email" name='email' />
      <FormField fullWidth label="Phone" name='phone' />
      <FormField fullWidth label="Address" name='address' />
    </FormCard>
  )
}

export default ContactInformation
