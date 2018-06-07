using Angular4Library.Data.Enums;
using Angular4Library.Data.Models.DataTransfer;
using Angular4Library.Data.Transfer.Helpers;
using Angular4Library.Repositories;
using Angular4Library.ViewModels;
using Angular4Library.ViewModels.Export;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Angular4Library.BusinessLogic.Services.Transfer
{
    public class ExportService
    {
        private readonly RepositoryProvider _repositoryProvider;

        public ExportService()
        {
            _repositoryProvider = new RepositoryProvider();
        }

        public FileResult Export(ExportViewModel viewModel)
        {
            var model = new ExportModel();
            model.IsXml = viewModel.IsXml;
            model.IdsArray = viewModel.IdsArray;

            if (viewModel.Type == (int) ProductType.Book)
            {
                return new FileContentResult(ExportHelper.ExportBooks(model, _repositoryProvider),
                    "application/octet-stream")
                {
                    FileDownloadName = "exp-" + DateTime.Now + "-books" + (viewModel.IsXml ? ".xml" : ".txt")
                };
            }
            if (viewModel.Type == (int) ProductType.Journal)
            {
                return new FileContentResult(ExportHelper.ExportJournals(model, _repositoryProvider),
                    "application/octet-stream")
                {
                    FileDownloadName = "exp-" + DateTime.Now + "-journals" + (viewModel.IsXml ? ".xml" : ".txt")
                };
            }
            if (viewModel.Type == (int) ProductType.Newspaper)
            {
                return new FileContentResult(ExportHelper.ExportNewspapers(model, _repositoryProvider),
                    "application/octet-stream")
                {
                    FileDownloadName = "exp-" + DateTime.Now + "-newspapers" + (viewModel.IsXml ? ".xml" : ".txt")
                };
            }
            return null;
        }
    }
}
