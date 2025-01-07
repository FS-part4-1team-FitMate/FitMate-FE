import styles from "./PopUp.module.css";

interface Props {
	error: {
		message: string;
		onOK?: () => void;
		onCancel?: () => void;
	} | Error | null;
	setError: (error: any) => void;
	onlyCancel?: boolean;
}

function PopUp({ error, setError, onlyCancel=false }: Props) {
	return (
		<div className={["fixed inset-0 bg-black-300/50 flex justify-center items-center z-50", (!error ? "hidden" : "")].join(" ")}>
			<div className="relative bg-white text-slate-900 w-[384px] max-w-full p-[16px] rounded-2xl shadow-lg">
				<div className="text-lg font-medium">
					{error?.message}
				</div>
				<div className="flex justify-end gap-[8px] mt-[16px]">
					{!onlyCancel && (<button className="px-[24px] py-[8px] text-lg rounded-xl bg-blue-600 text-white" onClick={() => {
						if (error && "onOK" in error) {
							error?.onOK?.();
						}
						setError(null);
					}}>확인</button>)}
					<button className="px-[24px] py-[8px] text-lg rounded-xl bg-white text-slate-900 border border-solid border-gray-900" onClick={() => {
						if (error && "onCancel" in error) {
							error?.onCancel?.();
						}
						setError(null);
					}}>닫기</button>
				</div>
			</div>
		</div>
	);
}

export default PopUp;
