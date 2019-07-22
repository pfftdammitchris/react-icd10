import React from 'react'
import Button from 'components/common/Button'

const ProviderPortalMeetingICD10AddButton = (props) => (
  <Button
    type="button"
    hover={{ secondary: 'white' }}
    title="Add another ICD10"
    secondary
    {...props}
  >
    Add
  </Button>
)

export default ProviderPortalMeetingICD10AddButton
