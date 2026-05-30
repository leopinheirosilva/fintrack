import React from 'react'
import { NumericFormat } from 'react-number-format'

import { Input } from './input'

export const ForwardedNumericFormat = React.forwardRef((props, ref) => (
  <NumericFormat
    {...props}
    getInputRef={ref}
    thousandSeparator="."
    decimalSeparator=","
    prefix="R$"
    allowNegative={false}
    customInput={Input}
  />
))
ForwardedNumericFormat.displayName = 'ForwardedNumericFormat'
