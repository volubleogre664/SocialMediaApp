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

        public async Task UploadMediaFileAsync(Stream fileStream, string containerName, string blobName)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(blobName);
            await blobClient.UploadAsync(fileStream, overwrite: true);
        }

        public async Task<Stream> GetMediaFileAsync(string containerName, string blobName)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(containerName);
            var blobClient = containerClient.GetBlobClient(blobName);
            BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync();
            return blobDownloadInfo.Content;
        }
    }
}
