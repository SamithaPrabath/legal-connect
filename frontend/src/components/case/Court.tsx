import FormCard from '@components/FormCard'
import FormField from '@components/FormField'

const CaseCourt = () => {
  return (
    <FormCard id='caseCourt' title='Court' mt="20px">
      <FormField fullWidth label="Court Name" name='courtName' />
      <FormField fullWidth label="Phone" name='phone' />
      <FormField fullWidth label="Address" name='address' />
    </FormCard>
  )
}

export default CaseCourt
