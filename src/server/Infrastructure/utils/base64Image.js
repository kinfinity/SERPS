import buffer from 'buffer'
import fs from 'fs'
import path from 'path'

const imageBuffer = buffer.Buffer
const base64Image =  {
    // Encode -> Image to base64 string
    async encode(Image) {
        try {

            await fs.readFileSync(Image,(err,data) => {
                return imageBuffer.from(data).toString('base64')
            })

        } catch (e) {
            console.log(e)
        }
    },
    // Decode -> base64 String to Image
    async decode(base64String, writePath) {//writePath includes the filename and extension
        try {
        
            await fs.writeFileSync(

                path.join(__dirname,writePath),
                imageBuffer.from(base64String, 'base64'),
                (e) => {
                    throw e
                }
            )
            return true

        } catch (e) {
            console.log(e)
            return fasle
        }
    }
}

export default base64Image