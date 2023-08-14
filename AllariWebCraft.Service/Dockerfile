# Use the official .NET SDK image as a build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY AlleriWebCraft.Service/*.csproj ./AlleriWebCraft.Service/
RUN dotnet restore AlleriWebCraft.Service/AlleriWebCraft.Service.csproj

# Copy the remaining source code
COPY AlleriWebCraft.Service/. ./AlleriWebCraft.Service/

# Build the project
RUN dotnet build AlleriWebCraft.Service/AlleriWebCraft.Service.csproj -c Release -o /app

# Use the official .NET SDK image as the final image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the build output from the build image
COPY --from=build /app .

# Set the entry point
CMD ["dotnet", "AlleriWebCraft.Service.dll"]
