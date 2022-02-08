import React, {MutableRefObject} from "react";

type ShowAddedFilesType = {
    showAddedFile: string[]
    resetFile: (file: string) => void
}
export const ShowAddedFiles: React.FC<ShowAddedFilesType> = React.memo(props => {
    const {resetFile, showAddedFile} = props;

    return (
        <div  className={'addedImgBody'}>
            {showAddedFile.map((file, index) => (
                <div key={index} className={'addedImgContainer'}>
                    <img src={file} alt={'file'}/>
                    <span onClick={() => resetFile(file)}>x</span>
                </div>
            ))}
        </div>
    )
})