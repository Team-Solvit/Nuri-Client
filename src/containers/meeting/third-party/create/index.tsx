"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApollo } from '@/lib/apolloClient';
import { GroupService } from '@/services/group';
import { useAlertStore } from '@/store/alert';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useLoadingEffect } from '@/hooks/useLoading';
import Square from '@/components/ui/button/square';
import ImageUpload from '@/components/ui/ImageUpload';
import * as S from './style';

export default function CreateThirdPartyContainer() {
  const router = useRouter();
  const client = useApollo();
  const { success, error } = useAlertStore();
  const { upload, loading: uploadLoading } = useFileUpload();

  const [loading, setLoading] = useState(false);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [profilePreview, setProfilePreview] = useState<string>('');

  useLoadingEffect(loading || uploadLoading);

  const [formData, setFormData] = useState({
    name: '',
    banner: '',
    description: '',
    profile: '',
    position: {
      area: '부산광역시 남구',
      latitude: 35.13340833,
      longitude: 129.0865
    },
    maxParticipation: 10
  });

  const busanDistricts = [
    { name: '남구', lat: 35.13340833, lng: 129.0865 },
    { name: '북구', lat: 35.1868, lng: 129.0115 },
    { name: '중구', lat: 35.1040, lng: 129.0320 },
    { name: '동구', lat: 35.1295, lng: 129.0456 },
    { name: '서구', lat: 35.0979, lng: 129.0244 },
    { name: '영도구', lat: 35.0907, lng: 129.0680 },
    { name: '부산진구', lat: 35.1623, lng: 129.0532 },
    { name: '동래구', lat: 35.2048, lng: 129.0837 },
    { name: '연제구', lat: 35.1760, lng: 129.0795 },
    { name: '수영구', lat: 35.1453, lng: 129.1133 },
    { name: '해운대구', lat: 35.1630, lng: 129.1635 },
    { name: '사하구', lat: 35.1044, lng: 128.9746 },
    { name: '금정구', lat: 35.2428, lng: 129.0927 },
    { name: '강서구', lat: 35.2119, lng: 128.9803 },
    { name: '사상구', lat: 35.1549, lng: 128.9906 },
    { name: '기장군', lat: 35.2447, lng: 129.2224 }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('position.')) {
      const positionField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        position: {
          ...prev.position,
          [positionField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleDistrictChange = (districtName: string) => {
    const district = busanDistricts.find(d => d.name === districtName);
    if (district) {
      setFormData(prev => ({
        ...prev,
        position: {
          area: `부산광역시 ${districtName}`,
          latitude: district.lat,
          longitude: district.lng
        }
      }));
    }
  };

  const handleBannerUpload = async (file: File) => {
    try {
      const uploadResult = await upload([file]);
      const imageUrl = uploadResult[0];
      setBannerPreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, banner: imageUrl }));
      success('배너 이미지가 업로드되었습니다.');
    } catch {
      error('배너 이미지 업로드에 실패했습니다.');
    }
  };

  const handleProfileUpload = async (file: File) => {
    try {
      const uploadResult = await upload([file]);
      const imageUrl = uploadResult[0];
      setProfilePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profile: imageUrl }));
      success('프로필 이미지가 업로드되었습니다.');
    } catch {
      error('프로필 이미지 업로드에 실패했습니다.');
    }
  };

  const handleBannerRemove = () => {
    setBannerPreview('');
    setFormData(prev => ({ ...prev, banner: '' }));
  };

  const handleProfileRemove = () => {
    setProfilePreview('');
    setFormData(prev => ({ ...prev, profile: '' }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      error('모임 이름을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      error('모임 설명을 입력해주세요.');
      return;
    }

    if (!formData.position.area) {
      error('활동 구를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);

      const groupCreateInput = {
        name: formData.name,
        banner: formData.banner || null,
        description: formData.description,
        profile: formData.profile || null,
        positionDto: {
          area: formData.position.area,
          latitude: formData.position.latitude,
          longitude: formData.position.longitude
        },
        maxParticipation: formData.maxParticipation
      };
      await GroupService.createGroup(client, groupCreateInput);
      success('모임이 성공적으로 생성되었습니다.');
      router.push('/meeting/third-party');
    } catch {
      error('모임 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <S.CreatePageWrapper>
      <S.Header>
        <S.Title>새로운 모임 만들기</S.Title>
      </S.Header>

      <S.Form>
        <S.FormSection>
          <S.Label>모임 이름</S.Label>
          <S.Input
            type="text"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
            placeholder="모임 이름을 입력해주세요"
            maxLength={50}
          />
        </S.FormSection>

        <S.FormSection>
          <S.Label>모임 설명</S.Label>
          <S.TextArea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
            placeholder="모임에 대한 설명을 입력해주세요"
            rows={4}
            maxLength={500}
          />
        </S.FormSection>

        <ImageUpload
          label="배너 이미지"
          preview={bannerPreview}
          loading={uploadLoading}
          icon="🖼️"
          onImageUpload={handleBannerUpload}
          onImageRemove={handleBannerRemove}
        />

        <ImageUpload
          label="프로필 이미지"
          preview={profilePreview}
          loading={uploadLoading}
          icon="👤"
          onImageUpload={handleProfileUpload}
          onImageRemove={handleProfileRemove}
        />

        <S.FormSection>
          <S.Label>활동 지역</S.Label>
          <S.LocationRow>
            <S.CityLabel>부산광역시</S.CityLabel>
            <S.Select
              value={formData.position.area.replace('부산광역시 ', '')}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleDistrictChange(e.target.value)}
            >
              <option value="">구를 선택해주세요</option>
              {busanDistricts.map(district => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </S.Select>
          </S.LocationRow>
        </S.FormSection>

        <S.FormSection>
          <S.Label className="optional">위치 좌표 (자동 설정됨)</S.Label>
          <S.CoordinateRow>
            <S.Input
              type="number"
              value={formData.position.latitude}
              placeholder="위도"
              step="0.000001"
              readOnly
              style={{ background: '#f8f9fa', color: '#666' }}
            />
            <S.Input
              type="number"
              value={formData.position.longitude}
              placeholder="경도"
              step="0.000001"
              readOnly
              style={{ background: '#f8f9fa', color: '#666' }}
            />
          </S.CoordinateRow>
        </S.FormSection>

        <S.FormSection>
          <S.Label className="optional">최대 참가 인원</S.Label>
          <S.Input
            type="number"
            value={formData.maxParticipation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const parsed = parseInt(e.target.value);
              const newValue = Number.isNaN(parsed)
                ? Math.max(formData.maxParticipation ?? 2, 2)
                : Math.max(parsed, 2);
              handleInputChange('maxParticipation', newValue);
            }}
            min={2}
            max={100}
          />
        </S.FormSection>
      </S.Form>

      <S.ButtonSection>
        <Square
          text="취소"
          onClick={handleCancel}
          status={false}
          width="48%"
        />
        <Square
          text={loading ? "생성 중..." : "모임 만들기"}
          onClick={handleSubmit}
          status={!loading && !!formData.name.trim() && !!formData.description.trim() && !!formData.position.area}
          width="48%"
        />
      </S.ButtonSection>
    </S.CreatePageWrapper>
  );
}
