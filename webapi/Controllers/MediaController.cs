namespace Webapi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Webapi.Interfaces;

    [ApiController]
    [Route("api/media")]
    public class MediaController : ControllerBase
    {
        private readonly IBlobStorageService blobStorageService;

        public MediaController(IBlobStorageService blobStorageService)
        {
            this.blobStorageService = blobStorageService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadMedia(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return this.BadRequest("No file uploaded");
            }

            using (var fileStream = file.OpenReadStream())
            {
                await this.blobStorageService.UploadMediaFileAsync(fileStream, "media-container", file.FileName);
            }

            return this.Ok();
        }

        [HttpGet("{blobName}")]
        public async Task<IActionResult> GetMedia(string blobName)
        {
            Stream fileStream = await this.blobStorageService.GetMediaFileAsync("media-container", blobName);

            if (fileStream == null)
            {
                return this.NotFound();
            }

            return this.File(fileStream, "application/octet-stream");
        }
    }
}
