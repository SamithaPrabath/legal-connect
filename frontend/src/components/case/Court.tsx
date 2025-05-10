import FormCard from '@components/FormCard'
import FormField from '@components/FormField'
import { CaseForm } from '@type/Case'

type PropTypes = {
  form: CaseForm,
  handleChange: (name: string, value: string | null) => void
}

const CaseCourt = ({ form, handleChange }: PropTypes) => {
  return (
    <FormCard id='caseCourt' title='Court' mt="20px">
      <FormField value={form.court.name} handleChange={handleChange} fullWidth label="Court Name" name='name' />
      <FormField value={form.court.phone} handleChange={handleChange} fullWidth label="Phone" name='phone' />
      <FormField value={form.court.address} handleChange={handleChange} fullWidth label="Address" name='address' />
    </FormCard>
  )
}

export default CaseCourt
