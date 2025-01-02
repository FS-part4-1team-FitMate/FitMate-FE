import React, { useContext, useEffect, useState } from "react";

export enum Device {
	PC = "PC",
	TABLET = "TABLET",
	MOBILE = "MOBILE",
}

const defaultValue: {
	device: Device;
	size: 12 | 14 | 16;
} = { device: Device.PC, size: 16 };

const ViewportContext = React.createContext(defaultValue);

export function useViewport() {
	const value = useContext(ViewportContext);
	if (value === undefined) {
		throw new Error("useViewport should be used within ViewportProvider.");
	}
	return value;
}

interface Props {
	defValue?: typeof defaultValue;
	children: React.ReactNode;
}

function ViewportProvider({ defValue = defaultValue, children }: Props) {
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setValue(
				window.innerWidth > 1200
				? { device: Device.PC, size: 16 }
				: window.innerWidth > 744
				? { device: Device.TABLET, size: 14 }
				: { device: Device.MOBILE, size: 12 }
			);
		});
		window.dispatchEvent(new Event("resize"));
	}, []);

	return (
		<ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>
	);
}

export default ViewportProvider;
