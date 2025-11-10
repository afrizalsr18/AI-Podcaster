import { GeneratePodcastProps } from '@/types'
import React from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid'
import { generateUploadUrl } from '@/convex/file'
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { toast } from "sonner"

const useGeneratePodcast = ({
  setAudio, voiceType, voicePrompt, setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateUploadUrl = useMutation(api.file.generateUploadUrl)
  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const { startUpload } = useUploadFiles(generateUploadUrl)

  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const generatePodcast = async () => {
    setIsGenerating(true)
    setAudio('');

    if (!voicePrompt) {
      toast("Provide voiceTyype to generate podcast")
      return setIsGenerating(false)
    }

    try {
      const response = await getPodcastAudio({
        input: voicePrompt,
        voice: voiceType
      })

      const blob = new Blob([response], { type: 'audio/mpeg' })
      const fileName = `podcast-${uuidv4}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' })

      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId)

      const audioUrl = await getAudioUrl({ storageId })
      setAudio(audioUrl!)
      setIsGenerating(false)
      toast("Podcast generated successfully")


    } catch (error) {
      console.log("error generating podcast", error)
      toast("Error generating podcast")
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generatePodcast
  }

}

const GeneratePodcast = (props: GeneratePodcastProps) => {

  const { isGenerating, generatePodcast } = useGeneratePodcast(props)

  return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className='text-16 font-bold text-white-1'>
          AI Prompt to generate podcast
        </Label>

        <Textarea
          className=' input-class focus:ring-offset-orange-1'
          placeholder='Write your prompt ...'
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />

      </div>

      <div className='mt-5 w-full max-w-[200px] text-white-1 text-1 font-bold'>
        <Button
          type="submit"
          className=" bg-orange-1 text-white-1 text-16 font-bold py-4"
          onClick={generatePodcast}
          disabled={isGenerating}
        >
          {isGenerating ? (
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
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className='mt-5'
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast