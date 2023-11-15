import { AiOutlineClose } from "react-icons/ai";
import { FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function PropertiesFormSidebar() {
	const { selectedElement, setSelectedElement } = useDesigner();
	if (!selectedElement) return null;

	const PropertiesForm =
		FormElements[selectedElement?.type].propertiesComponent;

	return (
		<div className='flex flex-col p-2 gap-2'>
			<div className='flex justify-between items-center'>
				<p className='text-sm text-foreground/70'>Element properties</p>
				<Button
					size={"icon"}
					variant={"ghost"}
					onClick={() => {
						setSelectedElement(null);
					}}
				>
					<AiOutlineClose />
				</Button>
			</div>
			<Separator />
			<PropertiesForm elementInstance={selectedElement} />
		</div>
	);
}

export default PropertiesFormSidebar;
