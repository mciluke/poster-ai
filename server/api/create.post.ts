export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event)

  // Create prediction
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + useRuntimeConfig().replicateApiToken
    },
    body: JSON.stringify({
      version:
        '9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      input: {
        prompt,
        num_outputs: 4,
        // num_inference_steps: 500
        // width: 1024,
        // height: 768
      }
    })
  })
  const json = await response.json()

  // Parse prediction
  const id = json.id
  const status = json.status
  const output = json.output

  return { id, status, output }
})
