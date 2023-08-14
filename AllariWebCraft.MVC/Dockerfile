# Use the official .NET SDK image as a build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY AlleriWebCraft.Mvc/*.csproj ./AlleriWebCraft.Mvc/
RUN dotnet restore AlleriWebCraft.Mvc/AlleriWebCraft.Mvc.csproj

# Copy the remaining source code
COPY AlleriWebCraft.Mvc/. ./AlleriWebCraft.Mvc/

# Build the project
RUN dotnet build AlleriWebCraft.Mvc/AlleriWebCraft.Mvc.csproj -c Release -o /app

# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the build output from the build image
COPY --from=build /app .

# Set the entry point
ENTRYPOINT ["dotnet", "AlleriWebCraft.Mvc.dll"]