import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonSize, cn, HtmlType, VARIANT } from '@common';

const Sizes: Record<ButtonSize, string> = {
  [ButtonSize.xs]: 'py-1 px-3 text-xs font-semibold h-6',
  [ButtonSize.sm]: 'py-1.5 px-4 text-sm font-semibold h-8',
  [ButtonSize.base]: 'py-2 px-8 text-sm font-semibold h-10',
  [ButtonSize.lg]: 'py-3 px-6 text-base font-semibold h-12',
  [ButtonSize.xl]: 'py-3 px-6 text-lg font-semibold h-14'
};

const Variants: Record<VARIANT, Array<string>> = {
  [VARIANT.PRIMARY]: [
    'rounded-full',
    'bg-gradient-to-rb from-primary-600 via-secondary-500 to-white text-cWhite',
    'hover:text-cBlack hover:to-100%',
    'buttonBgTransition'
  ],
  [VARIANT.SECONDARY]: [
    'text-cWhite',
    'bg-gradient-to-rb bg-gradient-to-rb from-black via-[#331e22] to-[#2c2130]',
    'from-100% hover:from-0%',
    'rounded-full',
    'buttonBgTransition'
  ],
  [VARIANT.GHOST]: [
    'bg-black rounded-full relative ',
    'before:absolute before:inset-0 before:-z-1',
    'before:content-[""]',
    'before:bg-gradient-to-rb before:from-primary-600/10 before:to-secondary-500/10',
    'before:opacity-0 before:hover:opacity-100',
    'before:rounded-full',
    'before:transition-opacity before:duration-300'
  ]
};

// TODO: Export types outside
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Text inside the button.
   */
  children: ReactNode | Array<ReactNode> | string;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Optional size (e.g., 'sm', 'md'), affects padding/font size.
   */
  size?: ButtonSize;

  /**
   * Style variant (e.g., 'primary', 'secondary'), defines appearance.
   */
  variant?: VARIANT;

  /**
   * If true, disables user interaction.
   */
  isDisabled?: boolean;

  /**
   * If true, button width extends to 100%.
   */
  isFullWidth?: boolean;

  /**
   * HTML button type attribute ('button', 'submit', etc.).
   */
  /**
   * HTML button type attribute ('button', 'submit', etc.).
   */
  htmlType?: HtmlType;

  /**
   * If true, adds a gradient border.
   */
  hasBorder?: boolean;

  /**
   * Function to call on button click.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  className,
  onClick = () => {},
  size = ButtonSize.base,
  variant = VARIANT.PRIMARY,
  isDisabled = false,
  hasBorder = false,
  htmlType = HtmlType.button,
  isFullWidth = false,
  ...restOfProps
}: ButtonProps) => {
  const classes = {
    container: cn(
      'relative z-1',
      'disabled:opacity-30 disabled:pointer-events-none',
      'transition-all duration-300',
      Sizes[size],
      ...(!hasBorder ? Variants[variant] : []),
      {
        'w-full': isFullWidth,
        'h-fit w-fit rounded-full bg-gradient-to-rb from-primary-600 to-secondary-500 p-px buttonBgTransitionReset': hasBorder
      },
      className
    ),
    innerContainer: cn(Variants[variant], Sizes[size], 'inline-block transition-all duration-300 ease-in-out w-full h-full')
  };

  return (
    <button onClick={onClick} disabled={isDisabled} type={htmlType} className={classes.container} {...restOfProps}>
      {hasBorder ? <span className={classes.innerContainer}>{children}</span> : children}
    </button>
  );
};
