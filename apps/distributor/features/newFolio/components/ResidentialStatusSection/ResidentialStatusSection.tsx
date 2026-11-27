'use client';

import { useState, type JSX } from 'react';

import { Button } from '@shared-ui/components/Button';
import { Icon } from '@shared-ui/components/Icon';
import { Input } from '@shared-ui/components/Input';
import { Modal } from '@shared-ui/components/Modal';
import { Select } from '@shared-ui/components/Select';

import {
  OFFLINE_KYC_OVD_DOCUMENTS,
  OVERSEAS_COUNTRY_OPTIONS,
  RESIDENCE_OTHER_CARDS,
} from '../../constants';
import type { OverseasAddressDetails, ResidenceOtherOption } from '../../types';
import type { ResidentialStatusSectionProps } from './ResidentialStatusSection.types';
import styles from './ResidentialStatusSection.module.scss';

/**
 * Renders conditional Residential Status views and regulatory edge-case modals:
 * - `usa`: nearest-branch restriction modal and inline notice.
 * - `other`: NRI / Foreign National / PIO selector cards, NRI Overseas Address form, and offline KYC guidance.
 * @param props Current residential status, overseas address, modal state, and update handlers.
 * @returns Conditional residential status block and dialogs, or null for domestic (`india`) selection.
 */
export function ResidentialStatusSection({
  residentialStatus,
  residenceOther,
  overseasAddress,
  usaModalOpen,
  offlineKycModalOpen,
  onResidenceOtherChange,
  onOverseasAddressChange,
  onCloseUsaModal,
  onCloseOfflineKycModal,
}: ResidentialStatusSectionProps): JSX.Element | null {
  const [tooltipKey, setTooltipKey] = useState<Exclude<ResidenceOtherOption, ''> | null>(null);

  if (residentialStatus !== 'usa' && residentialStatus !== 'other') {
    return null;
  }

  const updateAddress = (patch: Partial<OverseasAddressDetails>): void => {
    onOverseasAddressChange({ ...overseasAddress, ...patch });
  };

  return (
    <div className={styles.resStatusRoot}>
      <Modal
        open={usaModalOpen && residentialStatus === 'usa'}
        onClose={onCloseUsaModal}
        title="Branch Assistance Required"
        description="Please reach out to our nearest branch to open the folio for USA/Canada residents."
        actions={
          <Button variant="primary" onClick={onCloseUsaModal}>
            Got it
          </Button>
        }
      />

      <Modal
        open={
          offlineKycModalOpen &&
          residentialStatus === 'other' &&
          (residenceOther === 'foreign' || residenceOther === 'pio')
        }
        onClose={onCloseOfflineKycModal}
        title="Sorry! We can’t complete your KYC Process!"
        description="Below are the following steps you can do it offline:"
        className={styles.offlineModalDialog}
        actions={
          <Button variant="primary" onClick={onCloseOfflineKycModal}>
            Got it
          </Button>
        }
      >
        <div className={styles.offlineSteps}>
          <div className={styles.offlineStepCard}>
            <span className={styles.offlineStepNumber} aria-hidden="true">
              1
            </span>
            <div className={styles.offlineStepBody}>
              <p className={styles.offlineStepTitle}>Visit your nearest branch</p>
              <p>
                Kindly visit the nearest branch along with the following Official Valid Documents
                (OVD) and submit your KYC:
              </p>
              <ol className={styles.offlineOvdList}>
                {OFFLINE_KYC_OVD_DOCUMENTS.map((doc, idx) => (
                  <li key={doc} className={styles.offlineOvdItem}>
                    <span className={styles.offlineOvdIndex}>{idx + 1}.</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ol>
              <p>Along with the KYC, you can also submit the form for folio creation offline.</p>
            </div>
          </div>

          <div className={styles.offlineStepCard}>
            <span className={styles.offlineStepNumber} aria-hidden="true">
              2
            </span>
            <div className={styles.offlineStepBody}>
              <p className={styles.offlineStepTitle}>Create your folio online</p>
              <p>
                After submitting the KYC you can visit{' '}
                <a
                  href="https://www.icicipruamc.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.offlineLink}
                >
                  icicipruamc.com
                </a>{' '}
                to create the folio online.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {residentialStatus === 'usa' ? (
        <div role="note" className={styles.resStatusNotice}>
          Please reach out to our nearest branch to open the folio for USA/Canada residents.
        </div>
      ) : null}

      {residentialStatus === 'other' ? (
        <>
          <p className={styles.resStatusSubheading}>What is your residence status?</p>
          <div
            role="radiogroup"
            aria-label="Residence status"
            className={styles.resStatusRadioGrid}
          >
            {RESIDENCE_OTHER_CARDS.map((card) => {
              const selected = residenceOther === card.value;
              return (
                <div
                  key={card.value}
                  role="radio"
                  aria-checked={selected}
                  tabIndex={0}
                  className={`${styles.resStatusRadioCard} ${
                    selected ? styles.resStatusRadioCardSelected : ''
                  }`}
                  onClick={() => onResidenceOtherChange(card.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onResidenceOtherChange(card.value);
                    }
                  }}
                >
                  {selected ? (
                    <span className={styles.resStatusCheckBadge} aria-hidden="true">
                      <Icon name="check" size={11} />
                    </span>
                  ) : null}
                  <span className={styles.resStatusCardTitle}>{card.title}</span>
                  <span
                    className={styles.resStatusTooltipWrap}
                    onMouseEnter={() => setTooltipKey(card.value)}
                    onMouseLeave={() => setTooltipKey(null)}
                  >
                    <button
                      type="button"
                      className={styles.resStatusInfoBtn}
                      aria-label={`About ${card.title}`}
                      aria-describedby={`res-info-${card.value}`}
                      onClick={(event) => event.stopPropagation()}
                      onFocus={() => setTooltipKey(card.value)}
                      onBlur={() => setTooltipKey(null)}
                    >
                      i
                    </button>
                    {tooltipKey === card.value ? (
                      <span
                        id={`res-info-${card.value}`}
                        role="tooltip"
                        className={styles.resStatusTooltip}
                      >
                        {card.description}
                      </span>
                    ) : null}
                  </span>
                </div>
              );
            })}
          </div>

          {residenceOther === 'nri' ? (
            <div className={styles.overseasSection}>
              <h3 className={styles.overseasHeading}>Overseas Address Details</h3>
              <div className={styles.overseasGrid}>
                <div className={styles.overseasSpanThree}>
                  <Input
                    label="Address"
                    placeholder="Enter complete address"
                    value={overseasAddress.address}
                    onChange={(event) => updateAddress({ address: event.target.value })}
                  />
                </div>

                <div className={styles.overseasSpanThree}>
                  <Select
                    label="Country"
                    placeholder="Select country"
                    value={overseasAddress.country}
                    options={OVERSEAS_COUNTRY_OPTIONS}
                    onValueChange={(country) => updateAddress({ country })}
                  />
                </div>

                <div className={styles.overseasSpanTwo}>
                  <Input
                    label="City"
                    placeholder="Enter city"
                    value={overseasAddress.city}
                    onChange={(event) => updateAddress({ city: event.target.value })}
                  />
                </div>

                <div className={styles.overseasSpanTwo}>
                  <Input
                    label="State"
                    placeholder="Enter state"
                    value={overseasAddress.state}
                    onChange={(event) => updateAddress({ state: event.target.value })}
                  />
                </div>

                <div className={styles.overseasSpanTwo}>
                  <Input
                    label="Pin Code"
                    placeholder="Enter pin code"
                    value={overseasAddress.pinCode}
                    onChange={(event) => updateAddress({ pinCode: event.target.value })}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {residenceOther === 'foreign' || residenceOther === 'pio' ? (
            <div role="note" className={`${styles.resStatusNotice} ${styles.offlineInlineNotice}`}>
              Online KYC and folio creation are unavailable for{' '}
              {residenceOther === 'foreign' ? 'Foreign National' : 'Person Of Indian Origin'}{' '}
              applicants. Please visit the nearest branch with valid OVD documents.
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
