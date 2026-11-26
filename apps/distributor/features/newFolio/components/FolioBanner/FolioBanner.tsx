import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

import { ROUTES } from '@platform/constants/routes';
import { IMAGE_URL } from '@shared/utils/imageURL';
import { Icon } from '@shared-ui/components/Icon';

import { FOLIO_WIZARD_STEPS } from '../../constants';
import type { FolioBannerProps } from './FolioBanner.types';
import styles from './FolioBanner.module.scss';

/**
 * Orange hero banner with breadcrumb, page `<h1>`, and 3-step wave stepper for folio creation.
 * @param props Active step number (`1` | `2` | `3`).
 * @returns Folio creation banner header section.
 */
export function FolioBanner({ currentStep = 1 }: FolioBannerProps): JSX.Element {
  return (
    <section
      className={`${styles.folioBanner} folio-banner`}
      style={{ backgroundImage: `url("${IMAGE_URL.FOLIO_BANNER_BG.src}")` }}
      aria-label="Folio creation progress"
    >
      <div className={styles.folioBannerInner}>
        <div className={styles.folioBannerTitleGroup}>
          <nav className={styles.folioBannerBreadcrumb} aria-label="Breadcrumb">
            <Link href={ROUTES.distributor.home} className={styles.folioBannerBreadcrumbLink}>
              Distributor
            </Link>
            <Image
              src={IMAGE_URL.CHEVRON_RIGHT_LIGHT_ICON}
              alt=""
              width={11}
              height={11}
              unoptimized
              aria-hidden="true"
            />
            <span className={styles.folioBannerBreadcrumbCurrent} aria-current="page">
              New Folio
            </span>
          </nav>
          <h1 className={styles.folioBannerTitle}>Create Folio</h1>
        </div>

        <div className={styles.folioBannerStepperCard}>
          <Image
            src={IMAGE_URL.BANNER_STEPPER_WAVE}
            alt=""
            width={849}
            height={68}
            unoptimized
            aria-hidden="true"
            className={styles.folioBannerStepperWave}
          />
          <div className={styles.folioBannerStepperContent}>
            <ol className={styles.folioBannerStepperList} aria-label="Steps">
              {FOLIO_WIZARD_STEPS.map((step, index) => {
                const isDone = currentStep > step.stepNumber;
                const isActive = currentStep === step.stepNumber;
                const isHighlighted = isActive || isDone;

                return (
                  <li key={step.stepNumber} className={styles.folioBannerStepperItem}>
                    <div
                      className={styles.folioBannerStepNode}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span
                        className={[
                          styles.folioBannerStepCircle,
                          isActive ? styles.folioBannerStepCircleActive : '',
                          isDone ? styles.folioBannerStepCircleDone : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-hidden="true"
                      >
                        {isDone ? <Icon name="check" size={10} /> : null}
                      </span>
                      <span className={styles.folioBannerStepText}>
                        <span
                          className={`${styles.folioBannerStepOverline} ${
                            isHighlighted ? styles.folioBannerStepOverlineActive : ''
                          }`}
                        >
                          Step {step.stepNumber}
                        </span>
                        <span
                          className={`${styles.folioBannerStepName} ${
                            isHighlighted ? styles.folioBannerStepNameActive : ''
                          }`}
                        >
                          {step.label}
                        </span>
                      </span>
                    </div>

                    {index < FOLIO_WIZARD_STEPS.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={[
                          styles.folioBannerConnector,
                          index === 1 ? styles.folioBannerConnectorThin : '',
                          isDone ? styles.folioBannerConnectorDone : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.folioBannerLedge} aria-hidden="true" />
    </section>
  );
}
