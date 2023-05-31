namespace Webapi.Interfaces
{
    public interface IBlobStorageService
    {
        public Task UploadMediaFileAsync(Stream fileStream, string blobName, string contentType);

        public Task<Stream> GetMediaFileAsync(string blobName);

        public Task<string> GetMediaTypeAsync(string blobName);
    }
}
