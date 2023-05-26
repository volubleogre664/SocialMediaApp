namespace Webapi.Interfaces
{
    public interface IBlobStorageService
    {
        public Task UploadMediaFileAsync(Stream fileStream, string containerName, string blobName);

        public Task<Stream> GetMediaFileAsync(string containerName, string blobName);
    }
}
