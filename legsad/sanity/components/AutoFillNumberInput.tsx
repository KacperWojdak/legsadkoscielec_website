import { useCallback, useEffect } from "react";
import { set, unset } from "sanity";
import { useFormValue } from "sanity";
import { NumberInputProps } from "sanity";
import { useClient } from "sanity";

export function AutoFillNumberInput(props: NumberInputProps) {
  const { onChange, value } = props;
  const playerRef = useFormValue([...props.path.slice(0, -1), "player"]) as
    | { _ref: string }
    | undefined;

  const client = useClient({ apiVersion: "2024-01-01" });

  useEffect(() => {
    if (!playerRef?._ref) return;

    let cancelled = false;

    client
      .fetch(`*[_id == $id][0].number`, { id: playerRef._ref })
      .then((playerNumber: number | undefined) => {
        if (!cancelled && playerNumber !== undefined && value === undefined) {
          onChange(set(playerNumber));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [playerRef?._ref, client, onChange, value]);

  return props.renderDefault(props);
}