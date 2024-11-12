import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import Textarea from '@/Components/Textarea';
import TextInput from '@/Components/TextInput';
export default function ProposalForm({ onSubmit, errors, data, setData, processing, isDirty }) {
          return (
                    <div className='grid lg:grid-cols-2 gap-5'>
                              <form onSubmit={onSubmit} className='space-y-6'>
                                        <div>
                                                  <InputLabel htmlFor="title" value="Title" />
                                                  <TextInput
                                                            id="title"
                                                            name="title"
                                                            value={data.title}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('title', e.target.value)}
                                                  />
                                                  <InputError message={errors.title} className="mt-2" />
                                        </div>
                                        <div>
                                                  <InputLabel htmlFor="source" value="Source" />
                                                  <TextInput
                                                            id="source"
                                                            name="source"
                                                            value={data.source}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('source', e.target.value)}
                                                  />
                                                  <InputError message={errors.source} className="mt-2" />
                                        </div>
                                        <div>
                                                  <InputLabel htmlFor="sourceType" value="Source Type" />
                                                  <Select
                                                            id="sourceType"
                                                            name="sourceType"
                                                            value={data.sourceType}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('sourceType', e.target.value)}
                                                  >
                                                            <option value="Internal">Internal</option>
                                                            <option value="External">External</option>
                                                  </Select>
                                                  <InputError message={errors.sourceType} className="mt-2" />
                                        </div>
                                        <div>

                                                  <InputLabel htmlFor="attachment" value={data.editAttachment ? 'Change Attachment' : 'Attachment'} />
                                                  <TextInput
                                                            type='file'
                                                            id="attachment"
                                                            name="attachment"
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('attachment', e.target.files[0])}
                                                  />
                                                  <InputError message={errors.attachment} className="mt-2" />
                                        </div>
                                        <div>
                                                  <InputLabel htmlFor="description" value="Description" />
                                                  <Textarea
                                                            id="description"
                                                            name="description"
                                                            value={data.description}
                                                            className="mt-1 block w-full"
                                                            onChange={(e) => setData('description', e.target.value)}
                                                  />
                                                  <InputError message={errors.description} className="mt-2" />
                                        </div>
                                        <PrimaryButton type="submit" isLoading={processing} disabled={!isDirty} loadingText='Submitting'>Submit</PrimaryButton>
                              </form>
                              {data.editAttachment && (
                                        <img src={data.editAttachment} className='h-full object-cover' alt={data.editAttachment} />
                              )}
                    </div>
          );
}
