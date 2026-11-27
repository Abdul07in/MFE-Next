'use client';

import { useState, type ChangeEvent, type DragEvent, type JSX } from 'react';

import { Button } from '@shared-ui/components/Button';
import { DatePicker } from '@shared-ui/components/DatePicker';
import { Icon } from '@shared-ui/components/Icon';
import { Input } from '@shared-ui/components/Input';
import { Modal } from '@shared-ui/components/Modal';
import { Select } from '@shared-ui/components/Select';

import {
  MINOR_DOB_PROOF_OPTIONS,
  MINOR_PROOF_ALLOWED_EXTENSIONS,
  MINOR_PROOF_MAX_BYTES,
  MINOR_RELATION_OPTIONS,
  MINOR_REL_PROOF_OPTIONS,
} from '../../constants';
import type { MinorDetailsModalProps } from './MinorDetailsModal.types';
import styles from './MinorDetailsModal.module.scss';

/**
 * Modal dialog capturing minor holder identity, guardian relationship, and age/relationship proof uploads.
 * Automatically propagates `Birth Certificate` as relationship proof when uploaded as the DOB proof.
 * @param props Modal visibility, shared DOB bindings, minor document state, and change handlers.
 * @returns Accessible minor details modal dialog.
 */
export function MinorDetailsModal({
  open,
  onClose,
  dob,
  maxDob,
  onDobChange,
  value,
  onChange,
}: MinorDetailsModalProps): JSX.Element {
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const isBirthCertificate = value.dobProofType === 'Birth Certificate';
  const uploadTarget: 'dob' | 'rel' = !value.dobProofFileName ? 'dob' : 'rel';
  const uploadDisabled =
    uploadTarget === 'dob'
      ? !value.dobProofType
      : isBirthCertificate || !value.relProofType || Boolean(value.relProofFileName);

  const uploadHint =
    uploadTarget === 'dob'
      ? 'Select DOB proof type first'
      : isBirthCertificate
        ? 'Birth Certificate also covers relationship proof'
        : value.relProofFileName
          ? 'All required proofs uploaded'
          : 'Select relationship proof type to upload';

  const isComplete = Boolean(
    value.dobProofType &&
      value.dobProofFileName &&
      value.relProofType &&
      value.relProofFileName,
  );

  const handleFile = (file?: File | null): void => {
    if (!file || uploadDisabled) return;

    if (file.size > MINOR_PROOF_MAX_BYTES) {
      setUploadError('File size must be below 5MB');
      return;
    }

    if (!MINOR_PROOF_ALLOWED_EXTENSIONS.test(file.name)) {
      setUploadError('Only PDF, JPEG, PNG or Word files are allowed');
      return;
    }

    setUploadError('');
    if (uploadTarget === 'dob') {
      onChange({
        ...value,
        dobProofFileName: file.name,
        ...(isBirthCertificate
          ? { relProofType: 'Birth Certificate', relProofFileName: file.name }
          : {}),
      });
    } else {
      onChange({
        ...value,
        relProofFileName: file.name,
      });
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleFile(event.target.files?.[0] ?? null);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Enter Minor Details"
      className={styles.minorModalDialog}
      actions={
        <>
          <button type="button" className={styles.minorModalSkipBtn} onClick={onClose}>
            Skip
          </button>
          <Button variant="primary" disabled={!isComplete} onClick={onClose}>
            Continue
          </Button>
        </>
      }
    >
      <div className={styles.minorModalGridThree}>
        <Input
          label="Minor Name"
          placeholder="Full name"
          value={value.minorName}
          onChange={(event) => onChange({ ...value, minorName: event.target.value })}
        />

        <DatePicker
          label="Minor DOB"
          disableFuture
          maxDate={maxDob}
          value={dob}
          onValueChange={onDobChange}
        />

        <Select
          label="Relationship with Minor"
          placeholder="Select relationship"
          value={value.relation}
          options={MINOR_RELATION_OPTIONS}
          onValueChange={(relation) => onChange({ ...value, relation })}
        />
      </div>

      <div className={styles.minorModalGridTwo}>
        <div>
          <Select
            label="DOB Proof Type"
            placeholder="Select proof type"
            value={value.dobProofType}
            options={MINOR_DOB_PROOF_OPTIONS}
            onValueChange={(dobProofType) => {
              setUploadError('');
              onChange({
                ...value,
                dobProofType,
                dobProofFileName: '',
                relProofType: '',
                relProofFileName: '',
              });
            }}
          />
          {isBirthCertificate ? (
            <p className={styles.minorProofHint}>Valid proof of relationship</p>
          ) : null}
          {value.dobProofFileName ? (
            <div className={styles.minorUploadedFile}>
              <span className={styles.minorUploadedBadge} aria-hidden="true">
                <Icon name="check" size={9} />
              </span>
              <span className={styles.minorUploadedName}>{value.dobProofFileName}</span>
              <button
                type="button"
                className={styles.minorRemoveFileBtn}
                onClick={() =>
                  onChange({
                    ...value,
                    dobProofFileName: '',
                    relProofType: '',
                    relProofFileName: '',
                  })
                }
              >
                Remove
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <Select
            label="Relationship Proof Type"
            placeholder="Select"
            disabled={!value.dobProofFileName || isBirthCertificate}
            value={value.relProofType}
            options={MINOR_REL_PROOF_OPTIONS}
            onValueChange={(relProofType) => {
              setUploadError('');
              onChange({
                ...value,
                relProofType,
                relProofFileName: '',
              });
            }}
          />
          {isBirthCertificate && value.dobProofFileName ? (
            <p className={styles.minorProofHint}>Auto-filled from Birth Certificate</p>
          ) : null}
          {value.relProofFileName && !isBirthCertificate ? (
            <div className={styles.minorUploadedFile}>
              <span className={styles.minorUploadedBadge} aria-hidden="true">
                <Icon name="check" size={9} />
              </span>
              <span className={styles.minorUploadedName}>{value.relProofFileName}</span>
              <button
                type="button"
                className={styles.minorRemoveFileBtn}
                onClick={() => onChange({ ...value, relProofFileName: '' })}
              >
                Remove
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`${styles.minorDropzone} ${isDragging ? styles.minorDropzoneDragging : ''} ${
          uploadDisabled ? styles.minorDropzoneDisabled : ''
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          if (!uploadDisabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          aria-label={
            uploadTarget === 'dob'
              ? 'Upload minor DOB proof document'
              : 'Upload guardian relationship proof document'
          }
          disabled={uploadDisabled}
          className={styles.minorDropzoneInput}
          onChange={handleFileInputChange}
        />
        <p className={styles.minorDropzoneTitle}>
          {uploadDisabled ? uploadHint : 'Select a file or Drag & Drop'}
        </p>
        <p className={styles.minorDropzoneSubtitle}>
          PDF, JPEG, PNG or Word · Max file size 5MB
        </p>
      </div>

      {uploadError ? (
        <p className={styles.minorUploadError} role="alert">
          {uploadError}
        </p>
      ) : null}
    </Modal>
  );
}
