import React from 'react'
import Typography from 'components/common/Typography'
import shouldUpdate from 'util/shouldUpdate'

const ProviderPortalMeetingICD10OutsideLink = () => (
  <Typography variant="caption">
    To see a more descriptive list, click{' '}
    <a
      href="https://icd.codes/icd10cm"
      target="_blank"
      rel="noopener noreferrer"
    >
      here
    </a>
    .
  </Typography>
)

export default shouldUpdate(() => false)(ProviderPortalMeetingICD10OutsideLink)
