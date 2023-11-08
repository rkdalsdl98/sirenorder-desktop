import { ViewBody } from "../../type/home.type";
import { PageType } from "../../type/regist.type";
import bodystyle from "../../css/bodystyle.module.css"
import TwoSideButton from "../common/twosidebutton";
import deleteimg from "../../css/images/delete_icon.png"
import { useCallback, useEffect, useRef, useState } from "react";
import { RegistValidation } from "./validation";

export default function SubImageForm({
    addImages,
    setChangeView,
    setChangeForm,
}: { 
    addImages(data: string[]) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [images, setImages] = useState<{ src: string, index: number }[]>([])
    const [uploaded, setUploaded] = useState<boolean>(false)
    const finder =  useRef<any>(null)

    const onFindImage = (event: any) => {
        if(uploaded) return
        setUploaded(true)

        const files = event.target.files
        if(files.length !== 1) {
            return
        }
        const file : File = files[0]
        if(RegistValidation.checkFileFormat(file)) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                if(fileReader.result !== null) {
                    setImages(prev => {
                        prev.push({
                            src: fileReader.result as string,
                            index: prev.length,
                        })
                        return prev
                    })
                    setTimeout(() => setUploaded(false), 100)
                }    
            }
        }
    }
    const findImage = (_: any) => finder.current.click()
    const onChangeView = () => setChangeView("login")
    const onDeleteItem = (index: number) => {
        setImages(prev => {
            return prev.filter(v => {
                let result = v.index !== index
                if(v.index > index) v.index -= 1
                return result
            })
        })
    }
    const next = () => {
        addImages(images.map(image => image.src))
        setChangeForm("last")
    }
    return (
        <div className={bodystyle.middlebody}>
            <span>마지막 이에요!</span>
            <form className={bodystyle.inputform}>
                <input
                className={bodystyle.inputImage}
                onClick={findImage}
                style={{ paddingLeft: "30px"}}
                readOnly
                placeholder="추가하고싶은 가게 이미지가 있다면 등록해주세요. (없으면 넘어가도 됩니다.)"
                ></input>
                <input 
                type="file" 
                style={{display: "none"}}
                ref={finder}
                onChange={onFindImage}
                ></input>
            </form>
            <ul 
            key="subimages"
            className={bodystyle.subimages_container}
            >
                {images.map(img => createImageItem({
                    src: img.src,
                    index: img.index,
                    onDelete: onDeleteItem
                }))}
            </ul>
            <TwoSideButton
            prev={onChangeView}
            next={next}
            />
        </div>
    )
}

const createImageItem = ({
    src,
    index,
    onDelete,
} : {
    src: string,
    index: number,
    onDelete?(index:number) : void,
}) => (
    <li key={index} className={bodystyle.subimage_wrapper}>
        <img className={bodystyle.prev_image} src={src}/>
        <img 
        className={bodystyle.delete_icon} 
        src={deleteimg} 
        onClick={_=> { if(onDelete !== undefined) onDelete(index) }}
        />
    </li>
)