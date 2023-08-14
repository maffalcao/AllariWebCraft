
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["AllariWebCraft.MVC/AllariWebCraft.MVC.csproj", "AllariWebCraft.MVC/"]
COPY ["AllariWebCraft.Service/AllariWebCraft.Service.csproj", "AllariWebCraft.Service/"]
RUN dotnet restore "AllariWebCraft.MVC/AllariWebCraft.MVC.csproj"
COPY . .
WORKDIR "/src/AllariWebCraft.MVC"
RUN dotnet build "AllariWebCraft.MVC.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AllariWebCraft.MVC.csproj" -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AllariWebCraft.MVC.dll"]
