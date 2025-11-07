import React, { useRef } from 'react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '../lib/utils'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { GenerateThumbnailProps } from '@/types'
import { Loader } from 'lucide-react'
import { Input } from './ui/input'
import Image from 'next/image'
import { toast } from 'sonner'

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,

} : GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  
  
  const imageRef = useRef<HTMLInputElement>(null)

  const handleImage = async (blob: Blob , fileName : string) => {
    setIsImageLoading(true)
    setImage('')

    try {
      
    } catch (error) {
      console.log(error)
      toast({
        title : "Error",
        description : "Error uploading image",
        type : "error"
      })
      setIsImageLoading(false)
    }
  }
  const generateImage = async ()=>{}
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {}

  const GenerateThumbnail = async () => {

  }

  return (
    <>
      <div className='generate_thumbnail'>
        <Button
          type='button'
          variant='plain'
          onClick={() => setIsAiThumbnail(true)}
          className={cn('', {
            'bg-black-6': isAiThumbnail
          })}
        > Use AI to generate thumbnail
        </Button>
        <Button
          type='button'
          variant='plain'
          onClick={() => setIsAiThumbnail(false)}
          className={cn('', {
            'bg-black-6': !isAiThumbnail
          })}
        > Upload Custom Image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className='flex flex-col gap-5 mt-5 '>
          <div className='flex flex-col gap-2.5'>
            <Label className='text-16 font-bold text-white-1'>
              AI Prompt to Generate Thumbnail
            </Label>

            <Textarea
              className=' input-class focus:ring-offset-orange-1'
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className='w-full max-w-[200px] text-white-1 text-1 font-bold'>
            <Button
              type="submit"
              className=" bg-orange-1 text-white-1 text-16 font-bold py-4"
              onClick={GenerateThumbnail}
              disabled={isImageLoading}
            >
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                <>
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className='image_div'
          onClick={() => imageRef?.current?.click()}
        >
          <Input 
            type='file'
            className='hidden'
            ref = {imageRef}
            onChange={(e) => {uploadImage(e)}}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg" 
              width={40}
              height={40}
              alt='upload image'
            />
          ) : (
            <div className='text-16 flex-center font-medium text-white-1'>
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}

          <div className='flex flex-col flex-center gap-1'>
            <h2 className='text-12 text-orange-1 font-bold'>Click to Upload</h2>
            <p className='text-12 font-normal text-gray-1'>SVG, PNG, JPEG or a GIF (max 1080 x 1080p)</p>
          </div>

        </div>
      )}
      {image && (
        <div className='flex-center w-full'>
          <Image 
            src={image}
            width={200}
            height={200}
            className='mt-5'
            alt='thumbnail'
          />
        </div>
        )}

        {image && (
          <div className='flex-center w-full'>
            <Image 
              src={image}
              height={200}
              width={200}
              className='mt-5'
              alt='thumbnail'
            />
          </div>  
        )
        }
    </>
  )
}

export default GenerateThumbnail