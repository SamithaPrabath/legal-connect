import FormField from '@components/FormField'
import InfoCard from './InfoCard'

const ContactInformation = () => {
  return (
    <InfoCard id='contactInfo' title='Contact Information' mt="20px">
      <FormField fullWidth label="Email" name='email' />
      <FormField fullWidth label="Phone" name='phone' />
      <FormField fullWidth label="Address" name='address' />
    </InfoCard>
  )
}

export default ContactInformation
