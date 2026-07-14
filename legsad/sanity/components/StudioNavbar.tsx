'use client'

import { Card, Flex } from "@sanity/ui";
import type { NavbarProps } from "sanity";

export default function StudioNavbar(props: NavbarProps) {
  return (
    <Card>
      <Flex align="center" gap={3} paddingX={3} paddingY={2}>
        <a
          href="/"
          style={{
            color: "white",
            fontSize: "13px",
            textDecoration: "none",
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: "6px",
            background: "#c0132a",
          }}
        >
          ← Powrót do strony głównej
        </a>
      </Flex>
      {props.renderDefault(props)}
    </Card>
  );
}