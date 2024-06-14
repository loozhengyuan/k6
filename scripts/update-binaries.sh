#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

k6_version="${K6_VERSION:-0.32.0}"

function update() {
    os="${1}"
    arch="${2}"

    mapped_os="${os}"
    if [[ "${os}" = 'macos' ]]; then
        mapped_os='darwin'
    fi
    if [[ "${os}" = 'windows' ]]; then
        mapped_os='win32'
    fi
    mapped_arch="${arch}"
    if [[ "${arch}" = 'amd64' ]]; then
        mapped_arch='x64'
    fi

    archive_name="k6-v${k6_version}-${os}-${arch}"
    archive_ext=".tar.gz"
    extract_cmd='tar -zxvf'
    if [[ "${os}" = 'macos' ]] || [[ "${os}" = 'windows' ]]; then
        archive_ext='.zip'
        extract_cmd='unzip'
    fi

    bin_dir="packages/k6-${mapped_os}-${mapped_arch}/bin"
    bin_name="k6"
    if [[ "${os}" = 'windows' ]]; then
        bin_name='k6.exe'
    fi

    curl \
        -fsSL \
        --proto '=https' \
        --tlsv1.2 \
        --output "${archive_name}${archive_ext}" \
        "https://github.com/grafana/k6/releases/download/v${k6_version}/${archive_name}${archive_ext}"
    ${extract_cmd} "${archive_name}${archive_ext}"

    mkdir -p "${bin_dir}"
    mv "${archive_name}/${bin_name}" "${bin_dir}/${bin_name}"
    chmod +x "${bin_dir}/${bin_name}"

    rm -rf "${archive_name}${archive_ext}" "${archive_name}"
}

update 'linux' 'amd64'
update 'linux' 'arm64'
update 'macos' 'amd64'
update 'macos' 'arm64'
update 'windows' 'amd64'
