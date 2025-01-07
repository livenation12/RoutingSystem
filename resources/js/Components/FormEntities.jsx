import React, { useState } from 'react'
import Textarea from './Textarea'
import InputLabel from './InputLabel'
import InputError from './InputError'
import Select from './Select'
import { ucFirst } from '@/helpers'
import TextInput from './TextInput'


export function FormInput({
          name,
          required = false,
          labelValue = ucFirst(name),
          message,
          ...props
}) {
          return (
                    <div>
                              <span className='inline-flex gap-x-1.5'>
                                        <InputLabel htmlFor={name} value={labelValue} />
                                        {required && <span className="text-red-500">*</span>}
                              </span>
                              <TextInput
                                        name={name}
                                        id={name}
                                        {...props}
                                        className="mt-1 block w-full"
                              />
                              <InputError message={message} className="mt-2" />
                    </div>
          )
}


export const FormSelect = ({
          name,
          labelValue = ucFirst(name),
          message,
          options = [],
          required = false,
          hasOthersOption = false,
          value,
          onChange,  // Parent's change handler
          ...props
}) => {
          const [openOthers, setOpenOthers] = useState(false);
          const [customValue, setCustomValue] = useState('');  // Custom input for "Others"

          // Handle change in select dropdown
          const handleSelectChange = (e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === 'others') {
                              setOpenOthers(true);
                              setCustomValue('');  // Clear custom value when "Others" is selected
                    } else {
                              setOpenOthers(false);
                              // Pass selected value to parent onChange
                              onChange && onChange(e);  // Pass the full event object here
                    }
          };

          // Handle custom input change when "Others" is selected
          const handleCustomInputChange = (e) => {
                    setCustomValue(e.target.value);
                    // Pass custom input value to parent onChange
                    onChange && onChange(e);  // Pass the event object with custom value
          };

          return (
                    <div>
                              <span className='inline-flex gap-x-1.5'>
                                        <InputLabel htmlFor={name} value={labelValue} />
                                        {required && <span className="text-red-500">*</span>}
                              </span>
                              <Select
                                        name={name}
                                        id={name}
                                        value={value}
                                        onChange={handleSelectChange}  // Call handleSelectChange on dropdown change
                                        {...props}
                                        className="mt-1 block w-full"
                              >
                                        <option value="">Select {labelValue}</option>
                                        {options.map((option) => (
                                                  <option key={option.value} value={option.value}>
                                                            {option.label}
                                                  </option>
                                        ))}
                                        {hasOthersOption && (
                                                  <option value="others">Others</option>
                                        )}
                              </Select>
                              {openOthers && (
                                        <TextInput
                                                  required
                                                  name={name}
                                                  value={customValue}
                                                  onChange={handleCustomInputChange}
                                                  placeholder={`Other ${labelValue}`}
                                                  className="mt-1 block w-full"
                                        />
                              )}
                              <InputError message={message} className="mt-2" />
                    </div>
          );
};

export const FormTextArea = ({
          name,
          required = false,
          labelValue = ucFirst(name),
          message,
          ...props
}) => {
          return (
                    <div>
                              <span className='inline-flex gap-x-1.5'>
                                        <InputLabel htmlFor={name} value={labelValue} />
                                        {required && <span className="text-red-500">*</span>}
                              </span>
                              <Textarea
                                        name={name}
                                        id={name}
                                        {...props}
                                        className="mt-1 block w-full"
                              />
                              <InputError message={message} className="mt-2" />
                    </div>
          )
}