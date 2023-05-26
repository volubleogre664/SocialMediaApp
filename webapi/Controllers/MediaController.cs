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
