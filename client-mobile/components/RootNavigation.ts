import * as React from "react";
import { NavigationContainerRef } from "@react-navigation/native";

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
  React.createRef();

export function navigate(name: string, params?: object) {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.navigate(name, params);
  }
}
