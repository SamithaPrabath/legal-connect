import FormField from '@components/FormField'
import { useState } from 'react'
import FormCard from '../FormCard'


const CaseBasicInformation = () => {
    const [options, setOptions] = useState<string[]>(["hello"]);
  return (
    <FormCard id='caseBasicInfo' title='Basic Information' mt="20px">
      <FormField fullWidth label="Case Number" name='caseNumber' />
      <FormField fullWidth label="Case Name" name='caseName' />
      <FormField autocomplete fullWidth label="Case Type" name='caseType' options={options} optionLabel={option => option} />
    </FormCard>
  )
}

export default CaseBasicInformation;