import React from "react";
import Hammer from "hammerjs";

/**
 * Hammer Component
 * ================
 */

const handlerToEvent = {
  action: "tap press",
  onDoubleTap: "doubletap",
  onPan: "pan",
  onPanCancel: "pancancel",
  onPanEnd: "panend",
  onPanStart: "panstart",
  onPinch: "pinch",
  onPinchCancel: "pinchcancel",
  onPinchEnd: "pinchend",
  onPinchIn: "pinchin",
  onPinchOut: "pinchout",
  onPinchStart: "pinchstart",
  onPress: "press",
  onPressUp: "pressup",
  onRotate: "rotate",
  onRotateCancel: "rotatecancel",
  onRotateEnd: "rotateend",
  onRotateMove: "rotatemove",
  onRotateStart: "rotatestart",
  onSwipe: "swipe",
  onSwipeRight: "swiperight",
  onSwipeLeft: "swipeleft",
  onSwipeUp: "swipeup",
  onSwipeDown: "swipedown",
  onTap: "tap",
};

var privateProps: { [key: string]: boolean } = {
  children: true,
  direction: true,
  options: true,
  recognizeWith: true,
  vertical: true,
};

Object.keys(handlerToEvent).forEach(function (i) {
  privateProps[i] = true;
});

type HammerOptionsWithRecognizers = Omit<HammerOptions, "recognizers"> & {
  recognizers?: { [gesture: string]: RecognizerOptions } | undefined;
};

export interface ReactHammerProps {
  direction?:
    | "DIRECTION_NONE"
    | "DIRECTION_LEFT"
    | "DIRECTION_RIGHT"
    | "DIRECTION_UP"
    | "DIRECTION_DOWN"
    | "DIRECTION_HORIZONTAL"
    | "DIRECTION_VERTICAL"
    | "DIRECTION_ALL"
    | undefined;
  options?: HammerOptionsWithRecognizers | undefined;
  recognizeWith?: { [gesture: string]: Recognizer | string } | undefined;
  vertical?: boolean | undefined;
  action?: HammerListener | undefined;
  onDoubleTap?: HammerListener | undefined;
  onPan?: HammerListener | undefined;
  onPanCancel?: HammerListener | undefined;
  onPanEnd?: HammerListener | undefined;
  onPanStart?: HammerListener | undefined;
  onPinch?: HammerListener | undefined;
  onPinchCancel?: HammerListener | undefined;
  onPinchEnd?: HammerListener | undefined;
  onPinchIn?: HammerListener | undefined;
  onPinchOut?: HammerListener | undefined;
  onPinchStart?: HammerListener | undefined;
  onPress?: HammerListener | undefined;
  onPressUp?: HammerListener | undefined;
  onRotate?: HammerListener | undefined;
  onRotateCancel?: HammerListener | undefined;
  onRotateEnd?: HammerListener | undefined;
  onRotateMove?: HammerListener | undefined;
  onRotateStart?: HammerListener | undefined;
  onSwipe?: HammerListener | undefined;
  onSwipeRight?: HammerListener | undefined;
  onSwipeLeft?: HammerListener | undefined;
  onSwipeUp?: HammerListener | undefined;
  onSwipeDown?: HammerListener | undefined;
  onTap?: HammerListener | undefined;
}

function updateHammer(hammer: HammerManager, props: ReactHammerProps) {
  if (props.hasOwnProperty("vertical")) {
    console.warn("vertical is deprecated, please use `direction` instead");
  }

  var directionProp = props.direction;
  if (directionProp || props.hasOwnProperty("vertical")) {
    var direction = directionProp
      ? directionProp
      : props.vertical
        ? "DIRECTION_ALL"
        : "DIRECTION_HORIZONTAL";
    hammer.get("pan").set({ direction: Hammer[direction] });
    hammer.get("swipe").set({ direction: Hammer[direction] });
  }

  if (props.options) {
    Object.keys(props.options).forEach(function (option) {
      if (option === "recognizers") {
        Object.keys(props.options.recognizers).forEach(function (gesture) {
          var recognizer = hammer.get(gesture);
          recognizer.set(props.options.recognizers[gesture]);
          if (props.options.recognizers[gesture].requireFailure) {
            recognizer.requireFailure(
              props.options.recognizers[gesture].requireFailure,
            );
          }
        }, this);
      } else {
        var key = option;
        var optionObj = {};
        optionObj[key] = props.options[option];
        hammer.set(optionObj);
      }
    }, this);
  }

  if (props.recognizeWith) {
    Object.keys(props.recognizeWith).forEach(function (gesture) {
      var recognizer = hammer.get(gesture);
      recognizer.recognizeWith(props.recognizeWith[gesture]);
    }, this);
  }

  Object.keys(props).forEach(function (p) {
    var e = handlerToEvent[p];
    if (e) {
      hammer.off(e);
      hammer.on(e, props[p]);
    }
  });
}

type TReactHammerProps = ReactHammerProps & {
  children: React.ReactElement;
  /** @private */ ref?: (domElement: HTMLElement) => void;
};
export default class HammerComponent extends React.Component<TReactHammerProps> {
  static displayName = "Hammer";
  hammer: HammerManager | undefined | null;
  domElement: HTMLElement | SVGElement | undefined;

  componentDidMount() {
    if (this.domElement) {
      this.hammer = new Hammer(this.domElement);
      updateHammer(this.hammer, this.props);
    } else {
      console.warn("Missing dom element");
    }
  }

  componentDidUpdate() {
    if (this.hammer) {
      updateHammer(this.hammer, this.props);
    }
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop(false);
      this.hammer.destroy();
    }
    this.hammer = null;
  }

  render() {
    const props: TReactHammerProps = {} as TReactHammerProps;

    (Object.keys(this.props) as Array<keyof TReactHammerProps>).forEach(
      (i: keyof TReactHammerProps) => {
        if (!privateProps[i]) {
          const prop: keyof TReactHammerProps = i;
          (props[prop] as any) = this.props[i];
        }
      },
    );

    var self = this;
    props.ref = function (domElement: HTMLElement) {
      if (self.props.ref) {
        self.props.ref(domElement);
      }
      self.domElement = domElement;
    };

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), props);
  }
}
