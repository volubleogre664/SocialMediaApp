namespace Webapi.Services
{
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;
    using Webapi.Interfaces;

    public class BlobStorageService : IBlobStorageService
    {
        private readonly BlobServiceClient blobServiceClient;

        public BlobStorageService(BlobServiceClient blobServiceClient)
        {
            this.blobServiceClient = blobServiceClient;
        }

        public async Task UploadMediaFileAsync(Stream fileStream, string blobName, string contentType)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient("media-container");
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(blobName);

            await blobClient.UploadAsync(fileStream, overwrite: true);

            BlobHttpHeaders headers = new ()
            {
                ContentType = contentType,
            };
            await blobClient.SetHttpHeadersAsync(headers);
        }

        public async Task<Stream> GetMediaFileAsync(string blobName)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient("media-container");
            var blobClient = containerClient.GetBlobClient(blobName);
            BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync();
            return blobDownloadInfo.Content;
        }

        public async Task<string> GetMediaTypeAsync(string blobName)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient("media-container");
            var blobClient = containerClient.GetBlobClient(blobName);

            var mediaProps = await blobClient.GetPropertiesAsync();
            var contentType = mediaProps.Value.ContentType;

            return contentType;
        }
    }
}
