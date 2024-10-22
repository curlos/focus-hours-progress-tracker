import "./style.css";
import "./tailwind.css";
import 'material-symbols'
import React from "react";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}