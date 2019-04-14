import { Color } from 'tns-core-modules/color';
import  { Visibility, Length, HorizontalAlignment, VerticalAlignment, dip } from 'tns-core-modules/ui/core/view';
import { LinearGradient } from 'tns-core-modules/ui/styling/gradient';
import { PercentLength } from 'tns-core-modules/ui/styling/style-properties';

export type StyleSheetObject = {
  [key: string]: Partial<StylePropeties>;
}

export type StylePropeties = {
    /**
     * Gets or sets the border color of the view.
     */
    borderColor: string | Color;

    /**
     * Gets or sets the top border color of the view.
     */
    borderTopColor: Color;

    /**
     * Gets or sets the right border color of the view.
     */
    borderRightColor: Color;

    /**
     * Gets or sets the bottom border color of the view.
     */
    borderBottomColor: Color;

    /**
     * Gets or sets the left border color of the view.
     */
    borderLeftColor: Color;

    /**
     * Gets or sets the border width of the view.
     */
    borderWidth: string | Length;

    /**
     * Gets or sets the top border width of the view.
     */
    borderTopWidth: Length;

    /**
     * Gets or sets the right border width of the view.
     */
    borderRightWidth: Length;

    /**
     * Gets or sets the bottom border width of the view.
     */
    borderBottomWidth: Length;

    /**
     * Gets or sets the left border width of the view.
     */
    borderLeftWidth: Length;

    /**
     * Gets or sets the border radius of the view.
     */
    borderRadius: string | Length;

    /**
     * Gets or sets the top left border radius of the view.
     */
    borderTopLeftRadius: Length;

    /**
     * Gets or sets the top right border radius of the view.
     */
    borderTopRightRadius: Length;

    /**
     * Gets or sets the bottom right border radius of the view.
     */
    borderBottomRightRadius: Length;

    /**
     * Gets or sets the bottom left border radius of the view.
     */
    borderBottomLeftRadius: Length;

    /**
     * Gets or sets the color of the view.
     */
    color: Color;

    /**
     * Gets or sets the background style property.
     */
    background: string;

    /**
     * Gets or sets the background color of the view.
     */
    backgroundColor: string | Color;

    /**
     * Gets or sets the background image of the view.
     */
    backgroundImage: string | LinearGradient;

    /**
     * Gets or sets the minimum width the view may grow to.
     */
    minWidth: Length;

    /**
     * Gets or sets the minimum height the view may grow to.
     */
    minHeight: Length;

    /**
     * Gets or sets the desired width of the view.
     */
    width: PercentLength;

    /**
     * Gets or sets the desired height of the view.
     */
    height: PercentLength;

    /**
     * Gets or sets margin style property.
     */
    margin: string | PercentLength;

    /**
     * Specifies extra space on the left side of this view.
     */
    marginLeft: PercentLength;

    /**
     * Specifies extra space on the top side of this view.
     */
    marginTop: PercentLength;

    /**
     * Specifies extra space on the right side of this view.
     */
    marginRight: PercentLength;

    /**
     * Specifies extra space on the bottom side of this view.
     */
    marginBottom: PercentLength;

    /**
     * Gets or sets the alignment of this view within its parent along the Horizontal axis.
     */
    horizontalAlignment: HorizontalAlignment;

    /**
     * Gets or sets the alignment of this view within its parent along the Vertical axis.
     */
    verticalAlignment: VerticalAlignment;

    /**
     * Gets or sets the visibility of the view.
     */
    visibility: Visibility;

    /**
     * Gets or sets the opacity style property.
     */
    opacity: number;

    /**
     * Gets or sets the rotate affine transform of the view.
     */
    rotate: number;

    /**
     * Gets or sets the translateX affine transform of the view in device independent pixels.
     */
    translateX: dip;

    /**
     * Gets or sets the translateY affine transform of the view in device independent pixels.
     */
    translateY: dip;

    /**
     * Gets or sets the scaleX affine transform of the view.
     */
    scaleX: number;

    /**
     * Gets or sets the scaleY affine transform of the view.
     */
    scaleY: number;

    //END Style property shortcuts

    /**
     * Gets or sets the automation text of the view.
     */
    automationText: string;

    /**
     * Gets or sets the X component of the origin point around which the view will be transformed. The deafault value is 0.5 representing the center of the view.
     */
    originX: number;

    /**
     * Gets or sets the Y component of the origin point around which the view will be transformed. The deafault value is 0.5 representing the center of the view.
     */
    originY: number;

    /**
     * Gets or sets a value indicating whether the the view is enabled. This affects the appearance of the view.
     */
    isEnabled: boolean;

    /**
     * Gets or sets a value indicating whether the user can interact with the view. This does not affect the appearance of the view.
     */
    isUserInteractionEnabled: boolean;

    /**
     * Instruct container view to expand beyond the safe area. This property is iOS specific. Default value: false
     */
    iosOverflowSafeArea: boolean;

    /**
     * Enables or disables the iosOverflowSafeArea property for all children. This property is iOS specific. Default value: true
     */
    iosOverflowSafeAreaEnabled: boolean;
};
